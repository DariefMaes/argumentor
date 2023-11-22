import { create } from "zustand";

interface Case {
  id: string;
  topic: string;
}

type UIState = {
  id: string;

  setId: (id: string) => void;
  cases: Case[];
  setCases: (cases: Case[]) => void;
  removeCase: (id: string) => void;
  addCase: (addedCase: Case) => void;
  userModal: boolean;
  setUserModal: (userModal: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  id: "",
  userModal: false,
  setUserModal: (userModal) => set({ userModal }),
  setId: (id) => set({ id }),
  cases: [],
  setCases: (cases) => set({ cases }),
  removeCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((c) => c.id.toString() !== id),
    })),
  addCase: (addedCase) =>
    set((state) => ({
      cases: [addedCase, ...state.cases],
    })),
}));
