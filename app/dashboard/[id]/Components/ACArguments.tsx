"use client";
import React, { useEffect, useRef, useState } from "react";
// import OptionButton from "./OptionButton";
import { useCompletion } from "ai/react";

interface Message {
  message: string;
  isUser: boolean;
}

function ACArguments({
  id,
  allMessages,
  setAllMessages,
  setACIsLoading,
  setACCompletion,
}: {
  id: string;
  allMessages: Message[];
  setAllMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setACCompletion: React.Dispatch<React.SetStateAction<string>>;
  setACIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [option, setOption] = useState<"essay" | "thesis" | null>("essay");
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useCompletion({
    api: "/api/ac-chat",
    body: {
      id,
      promptId: option,
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
        setOption(null);
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
    setACCompletion(completion);
    setACIsLoading(isLoading);
  }, [completion, isLoading]);
  const submitRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (option) {
      console.log("promptId", option);
      submitRef.current?.click();
    }
  }, [option]);

  useEffect(() => {
    setInput("Generate an essay");
  }, []);

  const handleClick = (title: "essay" | "thesis") => {
    setInput(`Generate an ${title}`);
    setOption(title);
  };
  return (
    <form
      ref={submitRef}
      onSubmit={handleSubmit}
      className="flex w-full justify-center gap-3 px-5"
    >
      <button
        onClick={() => handleClick("essay")}
        type="submit"
        className="whitespace-nowrap px-5 py-3 font-semibold border-slate-800 border-2 text-sm rounded-md"
      >
        Generate Essay
      </button>
      <button
        onClick={() => handleClick("thesis")}
        type="submit"
        className="whitespace-nowrap px-5 py-3 font-semibold border-slate-800 border-2 text-sm rounded-md"
      >
        Generate Thesis
      </button>
    </form>
  );
}

export default ACArguments;
