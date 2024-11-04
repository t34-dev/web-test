import { User } from "@clerk/clerk-sdk-node";

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
    }
  }
}

export {};
