import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
