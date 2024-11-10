import React, { FC } from "react";
import s from "./Logo.module.scss";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { Link } from "@/components/Link/Link";
import clsx from "clsx";

export interface LogoProps {
  classNames?: {
    icon?: string;
    txt?: string;
  };
  txt?: string;
  to?: string;
}

export const Logo: FC<LogoProps> = ({ txt = "TheRPC", to = "/", classNames }) => {
  return (
    <Link to={to} className={s.wrap}>
      <div className={clsx(s.wrap__icon, classNames?.icon)}>
        <LogoIcon size={16} />
      </div>
      <div className={clsx(s.wrap__txt, classNames?.txt)}>
        <b>{txt}</b>
        <span>.io</span>
      </div>
    </Link>
  );
};
