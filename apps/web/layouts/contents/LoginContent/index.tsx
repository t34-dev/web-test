import React, { FC, PropsWithChildren, ReactNode } from "react";
import s from "./InnerContent.module.scss";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { Place } from "@/types/place";
import { ArrowFatRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { PageLoader } from "@/components/loading/PageLoader";

interface LoginContentProps {
  mode?: Place;
  leftComponent: ReactNode;
}
export const LoginContent: FC<PropsWithChildren<LoginContentProps>> = ({
  children,
  mode = Place.LOGIN,
  leftComponent,
}) => {
  const arrowVariants = {
    hidden: {
      opacity: 0,
      x: -80,
      // Убрали delay отсюда
    },
    show: {
      opacity: 0.3,
      x: 0,
      transition: {
        delay: 1,
        duration: 0.6,
        ease: "easeOut",
        opacity: {
          duration: 0.3,
          delay: 1,
        },
        x: {
          duration: 0.6,
          delay: 1,
        },
      },
    },
  };
  return (
    <div className={clsx(s.wrap, s.wrap_login)}>
      <Container className={s.wrap__in}>
        <div className={clsx(s.wrap__left, s.wrap__left_login)}>
          <div className={s.wrap__leftContent}>{leftComponent}</div>
          <div className={s.wrap__leftBg} />
          <div className={clsx(s.wrap__leftBg, s.wrap__leftBgHide)} />
          <div className={s.gradientWrapper}>
            <motion.div
              variants={arrowVariants}
              initial="hidden"
              animate="show"
              style={{ width: "100%" }} // Добавьте базовые стили здесь
            >
              <ArrowFatRight size={100} className={s.icon} />
            </motion.div>
          </div>
        </div>

        <div className={s.wrap__right}>
          {children}
          <PageLoader />
        </div>
      </Container>
    </div>
  );
};
