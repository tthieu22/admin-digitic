import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Sửa đổi import Link
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getAllCoupon } from "../features/coupon/couponSlice";
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (text) => <div className="d-flex gap-3">{text}</div>,
  },
];

const Coupon = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const couponstate = useSelector((state) => state.coupon.coupons);

  const data = couponstate.map((coupon, index) => ({
    key: index,
    name: coupon.name,
    expiry: coupon.expiry,
    discount: coupon.discount,
    action: (
      <div className="d-flex gap-3">
        <Link to="/admin" className="text-dark">
          <FaEdit className="fs-4" />
        </Link>
        <Link to="/admin" className="text-dark">
          <MdDeleteForever className="fs-4" />
        </Link>
      </div>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Coupon;
