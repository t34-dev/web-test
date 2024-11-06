import type { OnPageTransitionStartAsync } from "vike/types";
import { useLayoutStore } from "@/store";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  useLayoutStore.setState({ isLoadingPage: true });
  console.log("Page transition start");
  document.querySelector("body")?.classList.add("page-is-transitioning");
};
