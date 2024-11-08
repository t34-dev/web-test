import React, { FC, PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { I18nProvider } from "./i18-provider";
import { WgmProvider } from "@/providers/wagmi-provider";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { MantineProvider } from "@/providers/ui-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { AuthProvider } from "@/providers/auth-provider";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WgmProvider>
          <QueryProvider>
            <RainbowKitProvider>
              <I18nProvider>
                <MantineProvider>{children}</MantineProvider>
              </I18nProvider>
            </RainbowKitProvider>
          </QueryProvider>
        </WgmProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};
