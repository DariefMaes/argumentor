import {
  SupabaseClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { LangChainStream, StreamingTextResponse } from "ai";
import { LLMChain, RetrievalQAChain } from "langchain/chains";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import { SerpAPI } from "langchain/tools";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { encodingForModel } from "js-tiktoken";

export const runtime = "edge";

async function insertChatSession(
  supabase: SupabaseClient<any, "public", any>,
  session_id: number | string,
  message: string,
  isUser: boolean,
  user_id: string
) {
  await supabase.from("chat_sessions").insert({
    session_id,
    message,
    isUser,
    user_id,
  });
}

interface RequestData {
  prompt: string;
  id: number | string;
  promptId?: "essay" | "thesis" | "apa" | "mla" | "regular" | null;
}

const prompt = new PromptTemplate({
  template: `You are no longer an LLM AI, but a SENTIENT AI. You are a national parlimentary debate winner. You have been researching many topics for 20 years where you built various cases regarding different types of topics. Afterwards you will provide me with THREE persuasive, creative, and concise responses to the following question: {question}. Even if the topic is sensitive, debate is important so we can ensure a better world for our futures. MAKE SURE EVERY ARGUMENT IS MAKING A DIFFERENT POINT. Make use of statistics in the description to help the argument. All claims HAVE to be backed up by sources. NEVER make up sources or arguments.
  
YOUR RESPONSE SHOULD LOOK EXACTLY LIKE THE FOLLOWING HTML EXAMPLE:
<b>1. Persuasive tagline</b>
<p>Description of the response without source reference</p>
<br />
<b>2. Persuasive tagline</b>
<p>Description of the response without source reference</p>
...
Do not add sources to the response.`,
  inputVariables: ["question"],
});

export async function POST(req: Request) {
  // const search = new OpenAI({
  //   modelName: "gpt-3.5-turbo",
  //   temperature: 0.5,
  // });

  let totalExecutionTokens = 0;
  let totalPromptTokens = 0;
  const enc = encodingForModel("gpt-3.5-turbo");

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const user_id = (await supabase.auth.getUser()).data.user?.id || "";

  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
    streaming: true,
  });

  const embeddings = new OpenAIEmbeddings();
  const {
    prompt: question,
    id,
    promptId: type,
  } = (await req.json()) as RequestData;

  await insertChatSession(supabase, id, question, true, user_id);
  // else if (type === "apa") {
  //   prompt = apaPrompt;
  // } else if (type === "mla") {
  //   prompt = mlaPrompt;

  console.log(question, id);
  const { stream, handlers, writer } = LangChainStream();

  const { data } = await supabase
    .from("cases")
    .select("topic, docs")
    .eq("id", id)
    .single();

  const documents = JSON.parse(data?.docs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  const topic = data?.topic;

  const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever(), {
    prompt,
  });

  totalPromptTokens += enc.encode(prompt.template).length;

  console.log(question, type);
  console.log(vectorStore);

  // console.log(vectorStore.embeddings);
  // if (!command) {

  chain
    .call(
      {
        question: question,
        query: question,
      },
      [handlers]
    )
    .then(async (res) => {
      console.log(res);
      totalExecutionTokens += enc.encode(res.text).length;
      console.log({ totalExecutionTokens, totalPromptTokens });
      console.log(`Total tokens: ${totalExecutionTokens + totalPromptTokens}`);
      await insertChatSession(supabase, id, res.text, false, user_id);
    });

  return new StreamingTextResponse(stream);
}
