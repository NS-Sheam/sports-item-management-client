import App from "../App";
import Inventory from "../pages/inventory/Inventory";
import ItemManagement from "../pages/item/ItemManagement";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SalesManagement from "../pages/sale/SalesManagement";

export const routeItems = [
  {
    name: "Inventory",
    path: "/",
    element: <App />,
    children: [
      {
        name: "Inventory",
        path: "/",
        element: <Inventory />,
      },
      {
        name: "Item Management",
        path: "/item-management",
        element: <ItemManagement />,
      },
      {
        name: "Sales Management",
        path: "/sales-management",
        element: <SalesManagement />,
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register />,
  },
];
