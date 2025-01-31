import { ReactNode } from "react";

export type TItemRoutes = {
  name?: string;
  path: string;
  element?: ReactNode;
  children?: TItemRoutes[];
  icon?: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
};

export type TRoutes = {
  path: string;
  element: ReactNode;
  children?: TRoutes[];
};
