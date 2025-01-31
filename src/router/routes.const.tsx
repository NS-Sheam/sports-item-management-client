import {
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
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
    icon: <DatabaseOutlined />,
    children: [
      {
        name: "Inventory",
        path: "/",
        element: <Inventory />,
        icon: <AppstoreOutlined />,
      },
      {
        name: "Item Management",
        path: "/item-management",
        element: <ItemManagement />,
        icon: <AppstoreOutlined />,
      },
      {
        // name: "Sales Management",
        path: "/sales-management",
        element: (
          <PrivateRoute userRole={["manager", "superAdmin"]}>
            <SalesManagement />
          </PrivateRoute>
        ),
        icon: <ShoppingCartOutlined />,
      },
      {
        // name: "User Management",
        path: "/users",
        element: (
          <PrivateRoute userRole={["superAdmin"]}>
            <UserManagement />
          </PrivateRoute>
        ),
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    // name: "Login",
    path: "/login",
    element: <Login />,
    icon: <LoginOutlined />,
  },
  {
    // name: "Register",
    path: "/register",
    element: <Register />,
    icon: <UserAddOutlined />,
  },
];
