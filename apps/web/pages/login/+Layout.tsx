import React, { FC, PropsWithChildren } from "react";
import s from "./index.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.wrap}>
      <Container className={s.wrap__in}>
        <div className={s.wrap__left}>
          <nav className={s.wrap__content}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
          <div className={s.wrap__leftBg} />
        </div>
        <div className={s.wrap__right}>{children}</div>
      </Container>
    </div>
  );
};
