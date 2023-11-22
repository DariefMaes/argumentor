"use client";
import { usePromptStore } from "@/app/stores/promptStore";
import React from "react";

type prompt = "essay" | "thesis" | "mla" | "apa" | "";

function OptionButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: prompt;
}) {
  const setPromptId = usePromptStore((state) => state.setPromptId);
  return (
    <button
      onClick={() => setPromptId(id)}
      className="whitespace-nowrap px-5 py-3 font-semibold border-slate-800 border-2 text-sm rounded-md"
    >
      {children}
    </button>
  );
}

export default OptionButton;
