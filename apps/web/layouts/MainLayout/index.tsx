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
  const isTestPage = pageContext.urlLogical.startsWith("/test");

  return (
    <RootProvider>
      <div className={clsx(s.wrap, className)}>
        {!isTestPage && <MainLayoutHeader className={clsx(classNameHeader)} />}
        <MainLayoutBody className={clsx(classNameBody)}>{children}</MainLayoutBody>
        {!isTestPage && <MainLayoutFooter className={clsx(classNameFooter)} />}
      </div>
    </RootProvider>
  );
};
