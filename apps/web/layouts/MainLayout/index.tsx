import "@mantine/core/styles.css";
import "@scss/main.scss";
import "./style.css";
import "@rainbow-me/rainbowkit/styles.css";

import clsx from "clsx";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MainLayoutFooter, MainLayoutHeader } from "@/layouts/MainLayout/inside";

import s from "./index.module.scss";
import { RootProvider } from "@/components/providers/root-provider";
import { usePageContext } from "vike-react/usePageContext";
import { ScrollAreaX } from "@/components/ScrollAreaX";
import { getPlace, Place } from "@/types/place";
import { CONST } from "@/const";

interface MainLayoutProps {
  className?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameFooter?: string;
}

// MainLayout/index.tsx
export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  className,
  classNameHeader,
  classNameBody,
  classNameFooter,
}) => {
  const { vikeStore, urlLogical } = usePageContext();
  const [showNavigation, setShowNavigation] = useState(vikeStore.place !== Place.LOGIN);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    setShowNavigation(getPlace(urlLogical) !== Place.LOGIN);
  }, [urlLogical]);

  return (
    <RootProvider>
      <ScrollAreaX isFull ref={scrollRef}>
        <div className={clsx(s.wrap, className)}>
          <AnimatePresence>
            {showNavigation && (
              <motion.div
                initial={isFirstRender ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={s.wrap__head}
              >
                <MainLayoutHeader className={clsx(classNameHeader)} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={clsx(s.wrap__body, classNameBody)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={urlLogical}
                initial={isFirstRender ? false : { opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: CONST.animation.duration }}
                className={s.wrap__bodyContent}
                onAnimationComplete={() => {
                  if (scrollRef.current) {
                    const event = new Event("resize");
                    window.dispatchEvent(event);
                  }
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showNavigation && (
              <motion.div
                initial={isFirstRender ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={s.wrap__footer}
              >
                <MainLayoutFooter className={clsx(classNameFooter)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollAreaX>
    </RootProvider>
  );
};
