import { Layout, Menu, Avatar, Button } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { routeItems } from "../../router/routes.const";
import { removeUser } from "../../redux/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserOutlined, LogoutOutlined, UsergroupAddOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const role = useAppSelector((state) => state.auth.user?.role);
  const username = useAppSelector((state) => state.auth.user?.name) || "User";

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  const items = sidebarItemGenerator(routeItems);
  if (role === "superAdmin") {
    items.push({
      key: "Users",
      icon: <UsergroupAddOutlined />,
      label: <NavLink to="/users">User Management</NavLink>,
    });
  }
  if (role === "manager" || role === "superAdmin") {
    items.push({
      key: "Sales Management",
      icon: <ShoppingCartOutlined />,
      label: <NavLink to="/sales-management">Sales Management</NavLink>,
    });
  }

  return (
    <Sider
      className="custom-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      breakpoint="lg"
      collapsedWidth="80"
      width={250}
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        overflow: "auto",
        // backgroundColor: "#fff",
      }}
    >
      {/* Avatar and User Info */}
      <div className="flex flex-col items-center py-4">
        <Avatar
          size={collapsed ? 40 : 60}
          icon={<UserOutlined />}
        />
        {!collapsed && (
          <div className="text-white text-center mt-2">
            <p className="font-semibold">{username}</p>
            <p className="text-xs opacity-75">{role}</p>
          </div>
        )}
      </div>

      {/* Scrollable Menu */}
      <div
        style={{
          height: "calc(100vh - 120px)",
          overflowY: "auto",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            ...items,
            {
              key: "Profile",
              icon: <UserOutlined />,
              label: <NavLink to="/profile">Profile</NavLink>,
            },
            {
              key: "Change Password",
              icon: <UserOutlined />,
              label: <NavLink to="/change-password">Change Password</NavLink>,
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: (
                <Button
                  type="text"
                  danger
                  onClick={handleLogout}
                  className="w-full text-left"
                  icon={<LogoutOutlined />}
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
