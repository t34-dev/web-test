import React, { FC, PropsWithChildren } from "react";
import s from "./DefaultModalLayout.module.scss";
import { ModalLayoutProps } from "../../types";

interface CustomLayoutProps extends ModalLayoutProps {
  title?: string;
  showCloseButton?: boolean;
}

export const CustomLayout: FC<PropsWithChildren<CustomLayoutProps>> = ({ children, onClose, title }) => {
  return (
    <div className={s.wrap}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title || "----"}</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      {children}
    </div>
  );
};
