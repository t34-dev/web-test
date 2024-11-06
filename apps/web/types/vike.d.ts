import { User } from "@clerk/clerk-sdk-node";
import { VikeStore } from "@/types/place";

declare global {
  namespace Vike {
    interface PageContext {
      pageProps: {
        locale: "en" | "ru";
      };
      urlLogical: string;
      clerkState?: {
        user: User;
        sessionId: string;
      } | null;
      vikeStore: VikeStore;
    }
  }
}

export {};
