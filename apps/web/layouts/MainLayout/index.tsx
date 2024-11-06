import "@mantine/core/styles.css";
import "@scss/main.scss";
import "./style.css";
import "@rainbow-me/rainbowkit/styles.css";

import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import { MainLayoutBody, MainLayoutFooter, MainLayoutHeader } from "@/layouts/MainLayout/inside";

import s from "./index.module.scss";
import { RootProvider } from "@/components/providers/root-provider";
import { usePageContext } from "vike-react/usePageContext";
import { ScrollArea } from "@mantine/core";
import { ScrollAreaX } from "@/components/ScrollAreaX";

interface MainLayoutProps {
  className?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameFooter?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  className,
  classNameHeader,
  classNameBody,
  classNameFooter,
}) => {
  const pageContext = usePageContext();
  const isTestPage = pageContext.urlLogical.startsWith("/login");

  return (
    <RootProvider>
      <ScrollAreaX
        isFull
        // type="always"
      >
        <div className={clsx(s.wrap, className)}>
          <div className={clsx(s.wrap__head, isTestPage && s.wrap__head__visible)}>
            <MainLayoutHeader className={clsx(classNameHeader)} />
          </div>
          <MainLayoutBody className={clsx(s.wrap__body, classNameBody)}>{children}</MainLayoutBody>
          <div className={clsx(s.wrap__footer, isTestPage && s.wrap__footer__visible)}>
            <MainLayoutFooter className={clsx(classNameFooter)} />
          </div>
        </div>
      </ScrollAreaX>
    </RootProvider>
  );
};
