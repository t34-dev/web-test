import React, { FC } from "react";
import s from "./Logo.module.scss";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { Link } from "@/components/Link/Link";

export interface LogoProps {
  txt?: string;
  to?: string;
}

export const Logo: FC<LogoProps> = ({ txt = "TheRPC", to = "/" }) => {
  return (
    <Link to={to} className={s.wrap}>
      <div className={s.wrap__icon}>
        <LogoIcon size={16} />
      </div>
      <div className={s.wrap__txt}>
        <b>{txt}</b>
        <span>.io</span>
      </div>
    </Link>
  );
};
