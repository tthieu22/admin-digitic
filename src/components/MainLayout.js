import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartShopping, FaFirstOrder } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { GrBlog } from "react-icons/gr";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard clasName="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customer",
              icon: <FaUser clasName="fs-4" />,

              label: "Customer",
            },
            {
              key: "catalog",
              icon: <FaCartShopping clasName="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "addproduct",
                  icon: <FaCartShopping clasName="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaCartShopping clasName="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder clasName="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder clasName="fs-4" />,
                  label: "List Brand",
                },
                {
                  key: "category",
                  icon: <TbCategory clasName="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <TbCategory clasName="fs-4" />,
                  label: "List Category",
                },
                {
                  key: "color",
                  icon: <IoMdColorPalette clasName="fs-4" />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <IoMdColorPalette clasName="fs-4" />,
                  label: "List Color",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaFirstOrder clasName="fs-4" />,

              label: "Orders",
            },
            {
              key: "blogs",
              icon: <GrBlog clasName="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <GrBlog clasName="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <GrBlog clasName="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <GrBlog clasName="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <GrBlog clasName="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaFirstOrder clasName="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
