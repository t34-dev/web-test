import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import s from "./index.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import { Switcher2 } from "@/components/Switcher2/Switcher2";

interface MainLayoutHeaderProps {
  className?: string;
}

export const MainLayoutHeader: FC<PropsWithChildren<MainLayoutHeaderProps>> = ({ className }) => {
  return (
    <header className={clsx(s.wrap, className)}>
      <Container>
        <nav className={s.wrap__content}>
          <Link to="/">Home</Link>
          <Link to="/query">Query</Link>
          <Link to="/lang">Lang</Link>
          <Link to="/star-wars">StarWars</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Switcher2 />
        </nav>
      </Container>
    </header>
  );
};
