import { create } from "zustand";

interface LayoutStore {
  isLoadingPage: boolean;
  setIsLoadingPage: (status: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isLoadingPage: false,
  setIsLoadingPage: (status: boolean) => set({ isLoadingPage: status }),
}));
