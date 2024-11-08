import React, { FC, useState } from "react";
import s from "./InformerItem.module.scss";

export interface InformerItemProps {
  title: string;
  desc: string;
  value: string;
}

export const InformerItem: FC<InformerItemProps> = ({ value, title, desc }) => {
  return (
    <div className={s.wrap}>
      <div className={s.wrap__title}>{title}</div>
      <div className={s.wrap__desc}>{desc}</div>
      <div className={s.wrap__value}>{value}</div>
    </div>
  );
};
