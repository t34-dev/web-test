import s from "./Container.module.scss";
import React, { ComponentPropsWithoutRef, ElementType } from "react";

interface BaseContainerProps {
  className?: string;
}

type ContainerProps<T extends ElementType> = BaseContainerProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseContainerProps>;

// Сам компонент с обобщенным типом
export const Container = <T extends ElementType = "div">({
  children,
  className = "",
  as,
  ...rest
}: ContainerProps<T>) => {
  const Component = as || "div";

  return (
    <Component className={`${s.container} ${className}`} {...rest}>
      {children}
    </Component>
  );
};
