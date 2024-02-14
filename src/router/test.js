// export const routes = [
//   {
//     name: "dashboard",
//     path: "/",
//     element: "Dashboard",
//     children: [
//       {
//         name: "inventory",
//         path: "/inventory",
//         element: "Inventory",
//       },
//       {
//         name: "item-management",
//         path: "/item-management",
//         element: "ItemManagement",
//       },
//       {
//         name: "sales-management",
//         path: "/sales-management",
//         element: "SalesManagement",
//       },
//     ],
//   },
//   {
//     name: "login",
//     path: "/login",
//     element: "Login",
//   },
//   {
//     name: "register",
//     path: "/register",
//     element: "Register",
//   },
// ];

// const sidebarItem = routes.reduce((acc, item) => {
//   if (item.children) {
//     item.children.forEach((child) =>
//       acc.push({
//         key: child.name,
//         label: child.path,
//       })
//     );
//   }
//   return acc;
// }, []);

// const routesGenerator = routes.reduce((acc, item) => {
//   if (item.children) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//       children: item.children.map((child) => ({
//         path: child.path,
//         element: child.element,
//       })),
//     });
//   } else {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   return acc;
// }, []);

// console.log(sidebarItem);
