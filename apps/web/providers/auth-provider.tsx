import React, { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { usePageContext } from "vike-react/usePageContext";
import { InitialState } from "@clerk/types";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const pageContext = usePageContext();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      initialState={
        pageContext.clerkState
          ? ({
              userId: pageContext.clerkState.user.id,
              sessionId: pageContext.clerkState.sessionId,
              user: pageContext.clerkState.user,
            } as unknown as InitialState)
          : undefined
      }
    >
      {children}
    </ClerkProvider>
  );
};
