import React, { FC } from "react";
import s from "./PageHeader.module.scss";

interface PageHeaderProps {
  title: string;
  desc?: string;
}
export const PageHeader: FC<PageHeaderProps> = ({ title, desc }) => {
  return (
    <div className={s.header}>
      <h1 className={s.header__h1}>{title}</h1>
      {desc && <div className={s.header__desc}>{desc}</div>}
    </div>
  );
};
