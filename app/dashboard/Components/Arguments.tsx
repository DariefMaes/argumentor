"use client";
import { useUIStore } from "@/app/stores/uiStore";
import { MotionDiv } from "@/app/utils/framer";
import { useCompletion } from "ai/react";
import React, { useEffect } from "react";
import { BiSolidSend } from "react-icons/bi";
import { CgSpinnerAlt } from "react-icons/cg";

function Arguments() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
    });

  // if (!isLoading && completion) {
  //   if (input) {
  //     addCase({
  //       id: (Math.floor(Math.random()) * 1000000000).toString(),
  //       topic: input,
  //     });
  //   }
  // }
  return (
    <div className=" text-white gap-4 overflow-hidden flex flex-col w-full h-full">
      <MotionDiv
        transition={{ duration: 0.3, ease: "easeInOut" }}
        layout
        className="flex"
      >
        <form
          className="w-full h-fit p-5 flex focus:border-none focus:outline-none border-b-[1px]  border-white/10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search for a topic"
            className=" w-full  bg-transparent border-none focus:border-none focus-within:border-none focus-within:outline-none focus:outline-none text-white outline-none"
          />
          <button>
            <BiSolidSend className="text-white flex-shrink-0 pl-3 text-3xl" />
          </button>
        </form>
        {/* <select className="bg-[#0C2650] py-2 flex-grow text-white px-3 rounded-r-md">
            <option>Affirmative</option>
            <option>Negation</option>
          </select> */}
      </MotionDiv>

      {!completion && !isLoading && (
        <div className="flex flex-col gap-2 text-white/20 my-auto -translate-y-10 font-bold items-center">
          <div className="border-4 border-white/10 text-white/10 aspect-square w-20 h-20 text-4xl rounded-md flex items-center justify-center p-5">
            _
          </div>
          Much Empty
        </div>
      )}
      {completion && (
        <div
          className="p-5 gap-2 h-full flex flex-col"
          dangerouslySetInnerHTML={{ __html: completion }}
        />
      )}
      {/* <div className="">
          {!loading &&
            links.map((link: Link) => (
              <a
                target="_blank"
                key={link.source}
                href={link.link}
                className="text-blue-700 bg-white shadow-md p-2 rounded-md flex-nowrap"
              >
                {link.source}
              </a>
            ))}
        </div> */}
      {isLoading && !completion && (
        <CgSpinnerAlt className="animate-spin text-4xl mx-auto" />
      )}
      {/*
        {!loading &&
          debateArguments.map((argument: Argument) => (
            <div
              className="p-3 flex flex-col gap-2 rounded-xl shadow-md"
              key={argument.tagline}
            >
              <h2 className="text-xl font-semibold font-sans">
                {argument?.tagline}
              </h2>
              <p className="text-base font-light">{argument.description}</p>
            </div>
          ))} */}
    </div>
  );
}

export default Arguments;
