import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartShopping, FaFirstOrder } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { SiBrandfolder, SiGooglemarketingplatform } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import {
  IoMdColorPalette,
  IoMdNotifications,
  // IoMdNotificationsOff,
} from "react-icons/io";
import { GrBlog } from "react-icons/gr";
import { Link, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiCoupon2Fill } from "react-icons/ri";

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
        <div className="demo-logo-vertical logo text-bold text-center py-3 text-white fs-4 text-uppercase">
          <span className="lg-logo">HieuDev</span>
          <span className="sm-logo">HD</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "/admin",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customer",
              icon: <FaUser className="fs-4" />,

              label: "Customer",
            },
            {
              key: "catalog",
              icon: <FaCartShopping className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <FaCartShopping className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaCartShopping className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "List Brand",
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <TbCategory className="fs-4" />,
                  label: "List Category",
                },
                {
                  key: "color",
                  icon: <IoMdColorPalette className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <IoMdColorPalette className="fs-4" />,
                  label: "List Color",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaFirstOrder className="fs-4" />,

              label: "Orders",
            },
            {
              key: "blogs",
              icon: <GrBlog className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <GrBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <GrBlog className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <GrBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <GrBlog className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaFirstOrder className="fs-4" />,
              label: "Enquiries",
            },
            {
              key: "marketing",
              icon: <SiGooglemarketingplatform className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <RiCoupon2Fill className="fs-4" />,

                  label: "Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon2Fill className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="d-flex align-items-center justify-content-between"
        >
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
          <div className="d-flex gap-3 align-items-center dropdown">
            <div className="position-relative">
              <IoMdNotifications className="fs-3" role="button" />
              <span className="position-absolute fs-8 rounded-circle badge bg-warning">
                1
              </span>
            </div>
            <div
              className="d-flex align-items-center gap-3  "
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div>
                <img
                  src="https://th.bing.com/th/id/OIP.SAkHnK4yt1ed4oz6SzvawAHaEH?w=309&h=180&c=7&r=0&o=5&pid=1.7"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <h5 className="text-dark m-0">HieuDev</h5>
                <p className="m-0">tthieu.dev.02@gmail.com</p>
              </div>
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <Link to={"logout"} className="dropdown-item" type="button">
                  View Profile
                </Link>
              </li>
              <li>
                <Link to={"logout"} className="dropdown-item" type="button">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
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
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
