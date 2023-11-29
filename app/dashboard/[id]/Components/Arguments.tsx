"use client";
import { usePromptStore } from "@/app/stores/promptStore";
import { useUIStore } from "@/app/stores/uiStore";
import { MotionDiv } from "@/app/utils/framer";
import { useCompletion } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { CgSpinnerAlt } from "react-icons/cg";
// import OptionButton from "./OptionButton";
import Image from "next/image";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import ACArguments from "./ACArguments";

interface Message {
  message: string;
  isUser: boolean;
}

function Arguments({
  id,
  avatar,
  messages,
  params,
}: {
  id: string;
  messages:
    | {
        message: any;
        isUser: any;
      }[]
    | null;
  avatar: string;
  params: {
    id: string;
  };
}) {
  const [allMessages, setAllMessages] = useState<Message[]>(messages || []);
  const setId = useUIStore((state) => state.setId);
  const [ACCompletion, setACCompletion] = useState("");
  const [acIsLoading, setACIsLoading] = useState(false);
  const [user, setUser] = useState<Session | null>();
  const [acc, setAcc] = useState(false);
  const [pro, setPro] = useState(false);
  const [free, setFree] = useState(false);
  const [promptId, setPromptId] = usePromptStore((state) => [
    state.promptId,
    state.setPromptId,
  ]);
  setId(params.id);
  const submitRef = useRef<HTMLButtonElement>(null);
  // const [command, setCommand] = useState(false);
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useCompletion({
    api: "/api/chat",
    body: {
      id,
      promptId,
    },
    onResponse(response) {
      if (response.status === 200) {
        setAllMessages((prevMessages) => [
          ...prevMessages,
          {
            message: input,
            isUser: true,
          },
        ]);
        setPromptId("");
      }
    },
    onFinish(prompt, completion) {
      if (completion) {
        setAllMessages((prevMessages) => [
          ...prevMessages,
          {
            message: completion,
            isUser: false,
          },
        ]);
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClientComponentClient();
      const { data: user } = await supabase.auth.getSession();
      setUser(user?.session);
      const { data } = await supabase
        .from("users")
        .select("subscription_type")
        .single();
      if (data?.subscription_type === "ACC") {
        setAcc(true);
      } else if (data?.subscription_type === "PRO") {
        setPro(true);
      } else if (data?.subscription_type === "FREE") {
        setFree(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(allMessages);
  }, [allMessages]);

  // if (!isLoading && completion) {
  //   if (input) {
  //     addCase({
  //       id: (Math.floor(Math.random()) * 1000000000).toString(),
  //       topic: input,
  //     });
  //   }
  // }
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <MotionDiv
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" text-white gap-4 flex flex-col w-full h-full flex-1"
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {allMessages &&
          allMessages.map((message, index) => (
            <div
              className={`flex gap-5 border-b-[1px]   border-white/10 justify-center px-5 py-8 `}
              key={message.message + index}
            >
              {message.isUser ? (
                (avatar && (
                  <Image
                    alt="Profile picture"
                    src={avatar}
                    width={600}
                    height={600}
                    className="w-10 rounded-full"
                  />
                )) || (
                  <div className=" bg-green aspect-square w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {user?.user.user_metadata.full_name.charAt(0)}
                  </div>
                )
              ) : (
                <div className=" rounded-full bg-slate-100 font-semibold w-10 h-10 flex justify-center items-center p-4">
                  <span className="text-green">AM</span>
                </div>
              )}
              <div
                key={message.message}
                className={`gap-2 h-full w-full flex justify-center flex-col `}
                dangerouslySetInnerHTML={{ __html: message.message }}
              />
            </div>
          ))}
        {isLoading && completion && (
          <div
            className={`flex gap-5 border-b-[1px]   border-white/10 justify-center px-5 py-8 `}
          >
            <div className=" rounded-full bg-slate-100 font-semibold w-10 h-10 flex justify-center items-center p-4">
              <span className="text-green">AM</span>
            </div>
            <div
              className={`gap-2 h-full w-full flex justify-center flex-col `}
              dangerouslySetInnerHTML={{ __html: completion }}
            />
          </div>
        )}

        {ACCompletion && acIsLoading && (
          <div
            className={`flex gap-5 border-b-[1px]   border-white/10 justify-center px-5 py-8 `}
          >
            <div className=" rounded-full bg-slate-100 font-semibold w-10 h-10 flex justify-center items-center p-4">
              <span className="text-green">AM</span>
            </div>
            <div
              className={`gap-2 h-full w-full flex justify-center flex-col `}
              dangerouslySetInnerHTML={{ __html: ACCompletion }}
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {isLoading && !completion && (
        <CgSpinnerAlt className="animate-spin text-4xl mx-auto" />
      )}

      {acIsLoading && !ACCompletion && (
        <CgSpinnerAlt className="animate-spin text-4xl mx-auto" />
      )}

      {acc && (
        // <div className="flex w-full justify-center gap-3 px-5">
        //   <OptionButton onClick={submitACRequest} id="essay">
        //     Generate Essay
        //   </OptionButton>
        //   <OptionButton id="thesis">Generate Thesis</OptionButton>
        //   <OptionButton id="apa">Give APA Citations</OptionButton>
        //   <OptionButton id="mla">Give MLA Citations</OptionButton>
        // </div>
        <ACArguments
          setACIsLoading={setACIsLoading}
          setACCompletion={setACCompletion}
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          id={id}
        />
      )}

      {!free && (
        <form
          onSubmit={handleSubmit}
          className="w-full h-fit p-5 flex border-t-[1px] border-white/10"
        >
          <button
            ref={submitRef}
            type="submit"
            style={{ display: "none" }}
          ></button>

          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Chat with your research"
            className=" w-full border-none focus:border-none   bg-transparent outline-none"
          />
        </form>
      )}
    </MotionDiv>
  );
}

export default Arguments;
