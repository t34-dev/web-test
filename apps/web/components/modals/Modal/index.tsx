// Modal.tsx
import React, { FC, PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "@mantine/core";
import clsx from "clsx";
import s from "./Modal.module.scss";
import { transition } from "@/const";

type ModalVariant = "center" | "left" | "top" | "right" | "bottom";

export interface ModalProps {
  variant?: ModalVariant;
  opened: boolean;
  onClose?: () => void;
  className?: string;
  overlayClassName?: string;
}

const variants = {
  center: {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: "-50%",
      y: "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      y: "-50%",
      keyframes: [
        { scale: 0.5, opacity: 0 },
        { scale: 2.1, opacity: 1 },
        { scale: 1, opacity: 1 },
      ],
      transition: {
        ...transition,
        // scale: {
        //   ...transition,
        //   keyframes: [
        //     { scale: 0.5, opacity: 0 },
        //     { scale: 1.1, opacity: 1 },
        //     { scale: 1, opacity: 1 },
        //   ],
        // },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  },
  // Остальные варианты с обновленным transition
  left: {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition,
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  },
  right: {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition,
    },
    exit: { x: "100%", opacity: 0 },
  },
  top: {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition,
    },
    exit: { y: "-100%", opacity: 0 },
  },
  bottom: {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition,
    },
    exit: { y: "100%", opacity: 0 },
  },
};

export const ModalX: FC<PropsWithChildren<ModalProps>> = ({
  children,
  variant = "center",
  opened,
  onClose,
  className,
  overlayClassName,
}) => {
  return (
    <Portal>
      <AnimatePresence mode="wait">
        {opened && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className={clsx(s.overlay, overlayClassName)}
              onClick={onClose}
            />
            <motion.div
              className={clsx(s.modal, s[variant], className)}
              variants={variants[variant]}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};
