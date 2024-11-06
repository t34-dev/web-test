import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import s from "./MainLayoutBody.module.scss";

interface MainLayoutBodyProps {
  className?: string;
}

export const MainLayoutBody: FC<PropsWithChildren<MainLayoutBodyProps>> = ({ className, children }) => {
  return <main className={clsx(s.wrap, className)}>{children}</main>;
};
