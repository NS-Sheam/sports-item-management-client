import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { routeItems } from "../../router/routes.const";
import { removeUser } from "../../redux/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = sidebarItemGenerator(routeItems);
  const role = useAppSelector((state) => state.auth.user?.role);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  items.push({ key: "Logout", label: <div onClick={handleLogout}>Logout</div> });
  if (role === "superAdmin") {
    items.push({ key: "Users", label: <NavLink to="/user">Admin</NavLink> });
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ minHeight: "100vh", padding: "0.8rem 0" }}
    >
      <h2 className="text-white text-center text-2xl font-bold ">Sportiz</h2>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
