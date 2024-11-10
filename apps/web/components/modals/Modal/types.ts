import { ComponentType, ReactNode } from "react";

export interface ModalLayoutProps {
  onClose: () => void;
  children: ReactNode;
}

export type ModalVariant = "center" | "left" | "top" | "right" | "bottom";

export type ExtractLayoutProps<T> =
  T extends ComponentType<infer P> ? Omit<P, keyof ModalLayoutProps> : Record<string, never>;

export interface ModalProps<L extends ComponentType<ModalLayoutProps> | undefined = undefined> {
  variant?: ModalVariant;
  opened: boolean;
  onClose?: () => void;
  className?: string;
  overlayClassName?: string;
  layout?: L;
  layoutProps?: L extends ComponentType<ModalLayoutProps> ? ExtractLayoutProps<L> : undefined;
}
