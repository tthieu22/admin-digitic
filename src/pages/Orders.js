import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "ID",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderstate = useSelector((state) => state.auth.orders);
  const data = [];
  for (let i = 0; i < orderstate.length; i++) {
    if (orderstate[i].orderby == null) {
      data.push({
        key: orderstate[i]._id.toString() || i,
        name: null,
      });
    } else {
      data.push({
        key: orderstate[i]._id.toString() || i,
        name:
          orderstate[i].orderby.firstname +
          " " +
          orderstate[i].orderby.lastname,
        product: orderstate[i].products.map((item, index) => (
          <ul key={index}>
            <li>{item.product.title}</li>
          </ul>
        )),
        amount: orderstate[i].paymentIntent.amount,
        date: new Date(orderstate[i].createdAt).toLocaleString(),
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
      });
    }
  }
  return (
    <div>
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Orders;
