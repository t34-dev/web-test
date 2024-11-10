import { ScrollArea, ScrollAreaProps } from "@mantine/core";
import React, { forwardRef, useCallback } from "react";
import s from "./ScrollAreaX.module.scss";
import clsx from "clsx";
import { useScrollStore } from "@/store/scrollStore";

export interface ScrollAreaXProps extends ScrollAreaProps {
  isFull?: boolean;
  className?: string;
  rootClassName?: string;
  scrollbarClassName?: string;
  thumbClassName?: string;
}

export const ScrollAreaX = forwardRef<HTMLDivElement, ScrollAreaXProps>(
  (
    {
      isFull = false,
      className,
      rootClassName,
      scrollbarClassName,
      thumbClassName,
      classNames,
      scrollbarSize = 12,
      ...props
    },
    ref,
  ) => {
    const setScrollRef = useScrollStore((state) => state.setScrollRef);

    // Используем useCallback для создания стабильной функции
    const refCallback = useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }

        if (node) {
          setScrollRef(node);
        }
      },
      [ref, setScrollRef],
    );

    return (
      <ScrollArea
        viewportRef={refCallback}
        scrollbarSize={scrollbarSize}
        classNames={{
          root: clsx(isFull && s.rootScroll, rootClassName),
          scrollbar: clsx(s.scrollbar, scrollbarClassName),
          thumb: clsx(s.thumb, thumbClassName),
          ...classNames,
        }}
        {...props}
      >
        <div className={clsx(s.wrap, className)}>{props.children}</div>
      </ScrollArea>
    );
  },
);

ScrollAreaX.displayName = "ScrollAreaX";
