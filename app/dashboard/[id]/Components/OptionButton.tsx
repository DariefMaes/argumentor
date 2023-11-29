// "use client";
// import { usePromptStore } from "@/app/stores/promptStore";
// import React from "react";

// type prompt = "essay" | "thesis" | "mla" | "apa" | "";

// function OptionButton({
//   children,
//   id,
//   onClick,
// }: {
//   children: React.ReactNode;
//   id: prompt;
//   onClick: (e: React.FormEvent<HTMLFormElement>) => void;
// }) {
//   const setPromptId = usePromptStore((state) => state.setPromptId);
//   return (
//     <button
//       onClick={onClick}
//       className="whitespace-nowrap px-5 py-3 font-semibold border-slate-800 border-2 text-sm rounded-md"
//     >
//       {children}
//     </button>
//   );
// }

// export default OptionButton;
