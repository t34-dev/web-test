import React, { FC, PropsWithChildren } from "react";
import s from "./InnerContent.module.scss";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link/Link";
import clsx from "clsx";
import { usePageContext } from "vike-react/usePageContext";
import { Place, getPlace } from "@/types/place";
import { AnimatePresence, motion } from "framer-motion";

const ANIMATION_DURATION = 0.3;
const ANIMATION_EASE = "easeInOut";

export const InnerContent: FC<PropsWithChildren> = ({ children }) => {
  const { urlLogical } = usePageContext();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(true);
  const currentPlace = getPlace(urlLogical);

  return (
    <div className={clsx(s.wrap, currentPlace === Place.LOGIN && s.wrap_login, isExpanded && s.wrap_expanded)}>
      <Container className={s.wrap__in}>
        <AnimatePresence mode="popLayout">
          {showPanel && (
            <motion.div
              className={clsx(
                s.wrap__left,
                currentPlace === Place.LOGIN && s.wrap__left_login,
                isExpanded && s.wrap__left_expanded,
              )}
              initial={{ transform: "translateX(-100%)", opacity: 0 }}
              animate={{ transform: "translateX(0%)", opacity: 1 }}
              exit={{ transform: "translateX(-100%)", opacity: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASE,
                // Синхронизируем все свойства анимации
                opacity: {
                  duration: ANIMATION_DURATION,
                  ease: ANIMATION_EASE,
                },
              }}
              layout
            >
              <nav className={s.wrap__content}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Collapse" : "Expand"}</button>
              </nav>
              <div className={s.wrap__leftBg} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={s.wrap__right}
          layout
          transition={{
            duration: ANIMATION_DURATION,
            ease: ANIMATION_EASE,
          }}
        >
          <button onClick={() => setShowPanel(!showPanel)} className={s.wrap__toggleButton}>
            {showPanel ? "Hide Panel" : "Show Panel"}
          </button>
          {children}
        </motion.div>
      </Container>
    </div>
  );
};
