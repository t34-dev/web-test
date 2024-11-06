import React, { FC, PropsWithChildren } from "react";
import s from "./InnerContent.module.scss";
import { Link } from "@/components/Link/Link";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { LoaderX } from "@/components/LoaderX";

export const LoginContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx(s.wrap, s.wrap_login)}>
      <Container className={s.wrap__in}>
        <div className={clsx(s.wrap__left, s.wrap__left_login)}>
          <nav className={s.wrap__content}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
          <div className={s.wrap__leftBg} />
        </div>

        <div className={s.wrap__right}>
          {children}
          <LoaderX />
        </div>
      </Container>
    </div>
  );
};
