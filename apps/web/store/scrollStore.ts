import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ScrollState {
  scrollRef: HTMLDivElement | null;
  setScrollRef: (ref: HTMLDivElement | null) => void;
  scrollTo: (options: ScrollToOptions) => void;
}

export const useScrollStore = create<ScrollState>()(
  devtools(
    (set, get) => ({
      scrollRef: null,
      setScrollRef: (ref) => {
        if (ref !== get().scrollRef) {
          set({ scrollRef: ref });
        }
      },
      scrollTo: (options) => {
        const { scrollRef } = get();
        if (scrollRef) {
          scrollRef.scrollTo(options);
        }
      },
    }),
    { name: "scroll-store" },
  ),
);
