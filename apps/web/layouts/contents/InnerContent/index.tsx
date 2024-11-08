import React, { FC, PropsWithChildren } from "react";
import s from "./InnerContent.module.scss";
import { Link } from "@/components/Link/Link";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { PageLoader } from "../../../components/loading/PageLoader";

export const InnerContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx(s.wrap)}>
      <Container className={s.wrap__in}>
        <div className={clsx(s.wrap__left)}>
          <nav className={s.wrap__content}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
          <div className={s.wrap__leftBg} />
        </div>

        <div className={s.wrap__right}>
          {children}
          <PageLoader />
        </div>
      </Container>
    </div>
  );
};
