import { NavLink } from "react-router-dom";
import { TItemRoutes, TSidebarItem } from "../types";
import { AppstoreOutlined } from "@ant-design/icons";

export const sidebarItemGenerator = (items: TItemRoutes[]): TSidebarItem[] => {
  return items
    .map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          key: item.name,
          icon: item.icon || <AppstoreOutlined />,
          label: item.name,
          children: item.children.reduce((acc: TSidebarItem[], child) => {
            if (child.name) {
              acc.push({
                key: child.name,
                icon: child.icon || <AppstoreOutlined />,
                label: <NavLink to={child.path}>{child.name}</NavLink>,
              });
            }
            return acc;
          }, []),
        };
      }

      return item.name
        ? {
            key: item.name,
            icon: item.icon || <AppstoreOutlined />,
            label: <NavLink to={item.path}>{item.name}</NavLink>,
          }
        : null;
    })
    .filter(Boolean) as TSidebarItem[];
};
