import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import s from "./index.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";

interface MainLayoutHeaderProps {
  className?: string;
}

export const MainLayoutHeader: FC<PropsWithChildren<MainLayoutHeaderProps>> = ({ className }) => {
  return (
    <header className={clsx(s.wrap, className)}>
      <Container>
        <nav className={s.wrap__content}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </Container>
    </header>
  );
};
