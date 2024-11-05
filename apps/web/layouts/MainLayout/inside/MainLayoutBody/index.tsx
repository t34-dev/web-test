import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import s from "./index.module.scss";

interface MainLayoutBodyProps {
  className?: string;
}

export const MainLayoutBody: FC<PropsWithChildren<MainLayoutBodyProps>> = ({ className, children }) => {
  return <div className={clsx(s.wrap, className)}>{children}</div>;
};
