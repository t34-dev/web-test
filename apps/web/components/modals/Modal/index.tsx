// Modal.tsx
import React, { FC, PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "@mantine/core";
import clsx from "clsx";
import s from "./Modal.module.scss";
import { transition } from "@/pages/login/+Page";

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
      transition,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: "-50%",
      y: "-50%",
    },
  },
  left: {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition,
    },
    exit: { x: "-100%", opacity: 0 },
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

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  variant = "center",
  opened,
  onClose,
  className,
  overlayClassName,
}) => {
  return (
    <Portal>
      <AnimatePresence>
        {opened && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
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
