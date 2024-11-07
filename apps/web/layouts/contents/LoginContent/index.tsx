import React, { FC, PropsWithChildren, ReactNode } from "react";
import s from "./InnerContent.module.scss";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { LoaderX } from "@/components/LoaderX";
import { Place } from "@/types/place";

interface LoginContentProps {
  mode?: Place;
  leftComponent: ReactNode;
}
export const LoginContent: FC<PropsWithChildren<LoginContentProps>> = ({
  children,
  mode = Place.LOGIN,
  leftComponent,
}) => {
  return (
    <div className={clsx(s.wrap, s.wrap_login)}>
      <Container className={s.wrap__in}>
        <div className={clsx(s.wrap__left, s.wrap__left_login)}>
          <div className={s.wrap__leftContent}>{leftComponent}</div>
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
