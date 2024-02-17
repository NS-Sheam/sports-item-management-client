import App from "../App";
import Inventory from "../pages/inventory/Inventory";
import ItemManagement from "../pages/item/ItemManagement";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SalesManagement from "../pages/sale/SalesManagement";
import UserManagement from "../pages/user/UserManagement";
import PrivateRoute from "./PrivateRoute";

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
        path: "/sales-management",
        element: (
          <PrivateRoute userRole={["manager", "superAdmin"]}>
            <SalesManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute userRole={["superAdmin"]}>
            <UserManagement />
          </PrivateRoute>
        ),
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
