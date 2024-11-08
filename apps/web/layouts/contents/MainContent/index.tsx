import React, { FC, PropsWithChildren } from "react";
import { PageLoader } from "../../../components/loading/PageLoader";

export const MainContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <PageLoader fixed />
    </>
  );
};
