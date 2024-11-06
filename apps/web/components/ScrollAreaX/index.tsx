import { ScrollArea, ScrollAreaProps } from "@mantine/core";
import React, { forwardRef } from "react";
import s from "./ScrollAreaX.module.scss";
import clsx from "clsx";

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
      scrollbarSize = 16,
      ...props
    },
    ref,
  ) => {
    return (
      <ScrollArea
        ref={ref}
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
