import { ReactNode } from "react";

export type TItemRoutes = {
  name: string;
  path: string;
  element?: ReactNode;
  children?: TItemRoutes[];
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
};

export type TRoutes = {
  path: string;
  element: ReactNode;
  children?: TRoutes[];
};
