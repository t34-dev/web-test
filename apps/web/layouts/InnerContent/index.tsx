// index.tsx
import React, { FC, PropsWithChildren } from "react";
import s from "./InnerContent.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import clsx from "clsx";
import { usePageContext } from "vike-react/usePageContext";
import { Place, getPlace } from "@/types/place";

export const InnerContent: FC<PropsWithChildren> = ({ children }) => {
  const { urlLogical } = usePageContext();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const currentPlace = getPlace(urlLogical);

  return (
    <div className={clsx(s.wrap, currentPlace === Place.LOGIN && s.wrap_login, isExpanded && s.wrap_expanded)}>
      <Container className={s.wrap__in}>
        <div
          className={clsx(
            s.wrap__left,
            currentPlace === Place.LOGIN && s.wrap__left_login,
            isExpanded && s.wrap__left_expanded,
          )}
        >
          <nav className={s.wrap__content}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Collapse" : "Expand"}</button>
          </nav>
          <div className={s.wrap__leftBg} />
        </div>
        <div className={s.wrap__right}>{children}</div>
      </Container>
    </div>
  );
};
