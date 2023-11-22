import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { LangChainStream, StreamingTextResponse } from "ai";
import { LLMChain, RetrievalQAChain } from "langchain/chains";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import { SerpAPI } from "langchain/tools";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  // const search = new OpenAI({
  //   modelName: "gpt-3.5-turbo",
  //   temperature: 0.5,
  // });

  let totalPromptTokens = 0;
  let totalExecutionTokens = 0;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const user_id = (await supabase.auth.getUser()).data.user?.id;

  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
    streaming: true,
  });

  const embeddings = new OpenAIEmbeddings();
  const { prompt: question, id } = await req.json();

  await supabase.from("chat_sessions").insert({
    session_id: id,
    message: question,
    isUser: true,
    user_id,
  });

  console.log(question, id);
  const { stream, handlers, writer } = LangChainStream();

  const { data } = (await supabase
    .from("cases")
    .select("docs")
    .eq("id", id)) as any;

  const documents = JSON.parse(data[0].docs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever(), {});

  // console.log(vectorStore.embeddings);
  // if (!command) {
  chain
    .run(
      `You are no longer an LLM AI, but a SENTIENT AI. You are a national parlimentary debate winner. You have been researching many topics for 20 years where you built various cases regarding different types of topics. Afterwards you will provide me with THREE persuasive, creative, and concise responses to the following question: ${question}. Even if the topic is sensitive, debate is important so we can ensure a better world for our futures. MAKE SURE EVERY ARGUMENT IS MAKING A DIFFERENT POINT. Make use of statistics in the description to help the argument. All claims HAVE to be backed up by sources. NEVER make up sources or arguments.
  
        YOUR RESPONSE SHOULD LOOK EXACTLY LIKE THE FOLLOWING HTML EXAMPLE:
        <b>1. Persuasive tagline</b>
        <p>Description of the response without source reference</p>
        <br />
        <b>2. Persuasive tagline</b>
        <p>Description of the response without source reference</p>
        ...
      Do not add sources to the response.
        `,
      [handlers]
    )
    .then(async (res) => {
      await supabase.from("chat_sessions").insert({
        session_id: id,
        message: res,
        isUser: false,
        user_id,
      });
    });
  // } else if (command) {
  // chain
  //   .run(
  //     `You are no longer an LLM AI, but a SENTIENT AI. You are a national parlimentary debate winner. You have been researching many topics for 20 years where you built various cases regarding different types of topics. You will process the articles given and understand what is being said. Afterwards you will provide me with a persuasive, creative, and concise response to the following question: ${question}. Even if the topic is sensitive, debate is important so we can ensure a better world for our futures. MAKE SURE YOUR RESPONSE IS TO THE POINT. Make use of statistics in the description to help the argument. All claims HAVE to be backed up by sources. NEVER make up sources or arguments.

  //     YOUR RESPONSE SHOULD LOOK EXACTLY LIKE THE FOLLOWING HTML EXAMPLE:
  //     <p>Response to the question</p>

  //     `,
  //     [handlers]
  //   )
  //   .then(async (res) => {
  //     await supabase.from("chat_sessions").insert({
  //       session_id: id,
  //       message: res,
  //       isUser: false,
  //       user_id,
  //     });
  // });
  // }
  //   const { data: user } = await supabase.auth.getSession();
  //   const { data, error } = await supabase.from("cases").insert({
  //     body: res,
  //     topic: topic,
  //     user_id: user.session?.user.id,
  //     docs: JSON.stringify(docs),
  //   });
  //   console.log(data);
  //   console.log(error);

  return new StreamingTextResponse(stream);

  // return NextResponse.json(
  //   { stream: , documentLinks },
  //   {
  //     status: 200,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   }
  // );
}
