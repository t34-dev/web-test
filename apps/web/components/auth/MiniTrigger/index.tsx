import React, { FC, ReactNode } from "react";
import s from "./MiniTrigger.module.scss";

export interface MiniTriggerProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

export const MiniTrigger: FC<MiniTriggerProps> = ({ title, desc, icon }) => {
  return (
    <div className={s.wrap}>
      <div className={s.wrap__left}>{icon}</div>
      <div className={s.wrap__right}>
        <div className={s.wrap__title}>{title}</div>
        <div className={s.wrap__desc}>{desc}</div>
      </div>
    </div>
  );
};
