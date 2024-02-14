import { TItemRoutes, TRoutes } from "../types";

export const routesGenerator = (items: TItemRoutes[]) => {
  return items.reduce((acc: TRoutes[], item: TItemRoutes) => {
    if (item.children) {
      acc.push({
        path: item.path,
        element: item.element,
        children: item.children.map((child) => ({
          path: child.path,
          element: child.element,
        })),
      });
    } else {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    return acc;
  }, []);
};
