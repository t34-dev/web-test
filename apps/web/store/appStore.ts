import { create } from "zustand";

interface AppStore {
  count: number;
  increment: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
