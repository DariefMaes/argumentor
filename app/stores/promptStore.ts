import { create } from "zustand";

type prompt = "essay" | "thesis" | "mla" | "apa" | "";

interface PromptState {
  promptId: prompt;
  setPromptId: (id: prompt) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  promptId: "",
  setPromptId: (id) => set({ promptId: id }),
}));
