import React, { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import s from "./Modal.module.scss";
import { ModalProps, ModalLayoutProps, ModalVariant, ExtractLayoutProps } from "./types";
import { Portal } from "@mantine/core";
import { MODAL_VARIANTS, TRANSITIONS } from "./const";

export const ModalX = <L extends ComponentType<ModalLayoutProps> | undefined = undefined>({
  variant = "center",
  opened,
  onClose,
  className,
  overlayClassName,
  layout: Layout,
  layoutProps,
  children,
}: ModalProps<L> & { children: React.ReactNode }) => {
  if (!opened) return null;

  const renderContent = () => {
    if (!Layout) return children;

    const LayoutComponent = Layout as ComponentType<ModalLayoutProps>;
    return (
      <LayoutComponent onClose={onClose || (() => {})} {...(layoutProps as ExtractLayoutProps<NonNullable<L>>)}>
        {children}
      </LayoutComponent>
    );
  };

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {opened && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITIONS.fadeInOut}
              className={clsx(s.overlay, overlayClassName)}
              onClick={onClose}
            />
            <motion.div
              variants={MODAL_VARIANTS[variant]}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={clsx(s.modal, s[variant], className)}
            >
              {renderContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};
