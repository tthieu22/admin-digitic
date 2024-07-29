import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUSers } from "../features/customer/customerSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUSers());
  }, [dispatch]); // Thêm dispatch vào dependency array

  const customerstate = useSelector((state) => state.customer.customers);

  // Kiểm tra dữ liệu và xử lý
  const data = customerstate
    ? customerstate
        .filter((customer) => customer.role !== "admin")
        .map((customer, index) => ({
          key: customer.id || index, // Sử dụng customer.id nếu có, hoặc index nếu không có id
          name: `${customer.firstname} ${customer.lastname}`,
          email: customer.email,
          mobile: customer.mobile,
        }))
    : [];

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Customers;
