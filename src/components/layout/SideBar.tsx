import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { routeItems } from "../../router/routes.const";
import { useAppDispatch } from "../../redux/hooks";
import { removeUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = sidebarItemGenerator(routeItems);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  items.push({ key: "Logout", label: <div onClick={handleLogout}>Logout</div> });
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
