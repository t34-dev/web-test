import "@mantine/core/styles.css";
import "@scss/main.scss";
import "./style.css";
import s from "./Layout.module.scss";
import "@rainbow-me/rainbowkit/styles.css";

import React, { FC, PropsWithChildren } from "react";
import { RootProvider } from "@/providers/root-provider";
import { LayoutHeader } from "@/layouts/Layout/Header/LayoutHeader";
import { BlockchainTable } from "@/components/network/BlockchainTable";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RootProvider>
      {/*<div className={s.wrap}>*/}
      {/*  <LayoutHeader />*/}
      {/*  /!*<LayoutBody>{children}</LayoutBody>*!/*/}
      {/*</div>*/}
      <BlockchainTable />
    </RootProvider>
  );
};
