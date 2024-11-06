import React, { FC, PropsWithChildren } from "react";
import { LoaderX } from "@/components/LoaderX";

export const MainContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <LoaderX fixed />
    </>
  );
};
