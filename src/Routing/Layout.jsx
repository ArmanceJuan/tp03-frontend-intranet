import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../components/layout/Header";
import AppFooter from "../components/layout/Footer";
import "../css/index.scss";

// OK

const AppLayout = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <div>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </div>
  );
};

export default AppLayout;
