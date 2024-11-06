// index.tsx
import React, { FC } from "react";
import s from "./LoaderX.module.scss";
import { Loader } from "@mantine/core";
import clsx from "clsx";
import { useLayoutStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { CONST } from "@/const";

interface LoaderXProps {
  fixed?: boolean;
}

export const LoaderX: FC<LoaderXProps> = ({ fixed = false }) => {
  const { isLoadingPage } = useLayoutStore();

  return (
    <AnimatePresence>
      {isLoadingPage && (
        <motion.div
          className={clsx(s.wrap, fixed && s.wrap__fixed)}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: CONST.animation.duration }}
        >
          <Loader color="blue" size="xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
