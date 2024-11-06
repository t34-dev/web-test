import "@mantine/core/styles.css";
import "@scss/main.scss";
import "./style.css";
import "@rainbow-me/rainbowkit/styles.css";

import clsx from "clsx";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MainLayoutBody, MainLayoutFooter, MainLayoutHeader } from "@/layouts/MainLayout/inside";

import s from "./index.module.scss";
import { RootProvider } from "@/components/providers/root-provider";
import { usePageContext } from "vike-react/usePageContext";
import { ScrollAreaX } from "@/components/ScrollAreaX";
import { getPlace, Place } from "@/types/place";
import { Loader } from "@mantine/core";
import { InnerContent } from "@/layouts/InnerContent";

interface MainLayoutProps {
  className?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameFooter?: string;
}

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

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Обновляем состояние при изменении URL
  useEffect(() => {
    setShowNavigation(getPlace(urlLogical) !== Place.LOGIN);
  }, [urlLogical]);

  return (
    <RootProvider>
      <ScrollAreaX isFull>
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

          <motion.div layout className={clsx(s.wrap__body, classNameBody)}>
            <div className="page-transition-loader">
              <Loader color="blue" size="xl" />
            </div>
            <MainLayoutBody className={clsx(classNameBody)}>
              <InnerContent>{children}</InnerContent>
            </MainLayoutBody>
          </motion.div>

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
