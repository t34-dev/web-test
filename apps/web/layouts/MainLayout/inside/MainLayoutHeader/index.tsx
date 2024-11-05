import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

import s from "./index.module.scss";
import { Container } from "@/components/Container/Container";

interface MainLayoutHeaderProps {
  className?: string;
}

export const MainLayoutHeader: FC<PropsWithChildren<MainLayoutHeaderProps>> = ({ className }) => {
  return (
    <div className={clsx(s.wrap, className)}>
      <Container>
        <div className={s.wrap__content}>Content</div>
      </Container>
    </div>
  );
};
