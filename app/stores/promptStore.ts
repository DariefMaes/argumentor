import { create } from "zustand";

type prompt = "essay" | "thesis" | "mla" | "apa" | "";

const prompts = {
  essay: "Write an essay with the following thesis:",
  thesis: "Generate a thesis statement using the information given",
  mla: "Give the sources in MLA format",
  apa: "Give the sources in APA format",
  "": "",
};

interface PromptState {
  promptId: prompt;
  setPromptId: (id: prompt) => void;
  promptText: string;
}

export const usePromptStore = create<PromptState>((set) => ({
  promptId: "",
  promptText: "",
  setPromptId: (id) => set({ promptId: id, promptText: prompts[id] }),
}));
