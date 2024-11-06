import type { OnPageTransitionEndAsync } from "vike/types";
import { useLayoutStore } from "@/store";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  useLayoutStore.setState({ isLoadingPage: false });
  console.log("Page transition end");
  document.querySelector("body")?.classList.remove("page-is-transitioning");
};
