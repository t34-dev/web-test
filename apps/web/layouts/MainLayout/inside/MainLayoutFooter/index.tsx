import clsx from "clsx";
import React, { FC } from "react";

import s from "./index.module.scss";
import { Container } from "@/components/Container";

interface MainLayoutFooterProps {
  className?: string;
}

export const MainLayoutFooter: FC<MainLayoutFooterProps> = ({ className }) => {
  return (
    <footer className={clsx(s.wrap, className)}>
      <Container>
        <div className={s.wrap__content}>TheRPC.io</div>
      </Container>
    </footer>
  );
};
