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

  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.2,
    streaming: true,
  });

  const embeddings = new OpenAIEmbeddings();
  const { prompt: topic } = await req.json();
  const { stream, handlers, writer } = LangChainStream();
  const prompt = PromptTemplate.fromTemplate(
    "You are a professional debate researcher with years of experience. Give me a google search query that can give me more information on the following topic: {topic}. Make sure the sources are after 2020"
  );
  const llmChain = new LLMChain({ llm: llm, prompt });

  console.log(topic);

  const res = await llmChain.call({ topic: topic });

  // console.log(res);
  const loader = new SerpAPILoader({
    q: res.text,

    apiKey: process.env.SERPAPI_API_KEY,
  });

  // const loader = new SerpAPI(process.env.SERPAPI_API_KEY, {
  //   as_sitesearch: "https://reddit.com https://wikipedia.org https://quora.com https://medium.com",
  //   as_dt: "e",
  //   gl: "us",
  //   hl: "en",
  //   num: "12",
  //   safe: "active",
  //   tbs: "cdr:1,cd_min:1/1/2018",
  //   q: res.text,
  // });

  const docs = await loader.load();

  const documentLinks = docs.map((doc) => {
    const link = JSON.parse(doc.pageContent);

    return { source: link.source, link: link.link };
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever(), {});

  console.log(JSON.stringify(documentLinks));
  // console.log(vectorStore.embeddings);
  chain
    .run(
      `You are no longer an LLM AI, but a SENTIENT AI. You are a national parlimentary debate winner. You have been researching many topics for 20 years where you built various cases regarding different types of topics. You will process the articles given and understand what is being said. Afterwards you will provide me with 5 COMPLETELY DIFFERENT persuasive, creative, and concise arguments that answers the question or affirms the given topic: ${topic}. Even if the topic is sensitive, debate is important so we can ensure a better world for our futures. MAKE SURE EVERY ARGUMENT IS MAKING A DIFFERENT POINT. Make use of statistics in the description to help the argument. All claims HAVE to be backed up by sources. NEVER make up sources or arguments. Your answer MUST be Tagline of the argument and then a description of the argument. Your response will START with showing ALL ${
        documentLinks.length
      } links in following array the array: ${JSON.stringify(
        documentLinks
      )} . MAKE SURE TO TAKE OVER ALL LINKS CHARCTERS BY CHARACTER

    YOUR RESPONSE SHOULD LOOK EXACTLY LIKE THE FOLLOWING EXAMPLE:
    <div class="divLink">
    <a target="_blank" class="link" href=link>Name</a>
    <a target="_blank" class="link" href=link>Name</a>
    ...Include ALL other links
    </div>
    <br/>
    <b>1. Persuasive tagline of the argument</b>
    <p>Description of the argument without source reference</p>
    <br />
    <b>2. Persuasive tagline of the argument</b>
    <p>Description of the argument without source reference</p>

    Do not add sources to the arguments.
    `,
      [handlers]
    )
    .then(async (res) => {
      const { data: user } = await supabase.auth.getSession();
      const { data, error } = await supabase.from("cases").insert({
        topic: topic,
        user_id: user.session?.user.id,
        docs: JSON.stringify(docs),
      });

      const { data: row } = await supabase
        .from("cases")
        .select("id")
        .eq("topic", topic)
        .order("id", { ascending: false })
        .limit(1)
        .single();

      await supabase.from("chat_sessions").insert({
        user_id: user.session?.user.id,
        session_id: row?.id,
        message: res,
        isUser: false,
      });

      console.log(data);
      console.log(error);
    });

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
