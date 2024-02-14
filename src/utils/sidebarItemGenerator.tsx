import { NavLink } from "react-router-dom";
import { TItemRoutes, TSidebarItem } from "../types";

export const sidebarItemGenerator = (items: TItemRoutes[]): TSidebarItem[] => {
  const sidebarItem = items.reduce((acc: TSidebarItem[], item) => {
    if (item?.children) {
      item.children.forEach(
        (child) =>
          child.name &&
          acc.push({
            key: child?.name,
            label: <NavLink to={child?.path}>{child?.name}</NavLink>,
          })
      );
    }
    return acc;
  }, []);
  return sidebarItem;
};
