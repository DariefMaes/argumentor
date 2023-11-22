"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { cookies } from "next/headers";
import { MdMenuOpen, MdSettings } from "react-icons/md";
import Link from "next/link";
import TopicList from "../TopicList";

import { motion } from "framer-motion";
import { MotionDiv } from "@/app/utils/framer";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

function Navbar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <MotionDiv
        layout
        className={` ${
          open ? "max-w-xs" : "max-w-[64px]"
        } hidden flex-shrink-0 md:flex flex-col h-full w-full items-center border-r-[1px] bg-slate-900 z-50 border-white/10 justify-between`}
      >
        <div className="flex sticky w-full px-5 top-0 bg-slate-900 py-5 gap-5 justify-start md:justify-between items-center">
          <h2
            className={`font-semibold ${
              open ? "block" : "hidden"
            } col-start-1 col-span-1 text-xl`}
          >
            <span className="text-green">Argu</span>
            <span className="text-white">Mentor</span>
          </h2>
          <MotionDiv layout onClick={() => setOpen(!open)}>
            <MdMenuOpen
              className={`${
                !open && "rotate-180"
              } w-6 h-6 cursor-pointer duration-200 transition-all`}
            />
          </MotionDiv>
        </div>

        {open && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="px-5 ani flex flex-col overflow-auto h-full w-full gap-5"
            >
              <Link
                href={"/dashboard"}
                className="bg-white text-black font-semibold w-full text-center py-3 rounded-lg"
              >
                New topic
              </Link>
              <TopicList />
            </motion.div>
            {children}
          </>
        )}

        {!open && (
          <MotionDiv
            initial={{
              opacity: 0,
              x: "-5vw",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`  flex-col px-3 flex items-center py-5 gap-2`}
          >
            <button className="bg-slate-950/50 hover:bg-slate-900 transition-all duration-200 rounded-md p-3">
              <FaRegArrowAltCircleUp className="w-5 h-5 text-white" />
            </button>
            <button className="bg-slate-950/50 hover:bg-slate-900 transition-all duration-200 rounded-md p-3">
              <IoSettingsOutline className="w-5 h-5 text-white" />
            </button>
          </MotionDiv>
        )}
      </MotionDiv>
    </>
  );
}

export default Navbar;
