import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
// import { Column } from "@ant-design/charts";
import { Table } from "antd";

const Dashboard = () => {
  const columns = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "Status",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  // Dữ liệu mẫu cho biểu đồ
  // const data = [
  //   { type: "January", scales: 120000 },
  //   { type: "February", scales: 90000 },
  //   { type: "March", scales: 140000 },
  //   { type: "April", scales: 80000 },
  //   { type: "May", scales: 150000 },
  //   { type: "June", scales: 170000 },
  //   { type: "July", scales: 110000 },
  //   { type: "August", scales: 130000 },
  //   { type: "September", scales: 90000 },
  //   { type: "October", scales: 140000 },
  //   { type: "November", scales: 160000 },
  //   { type: "December", scales: 180000 },
  // ];

  // // Cấu hình cho biểu đồ cột
  // const config = {
  //   data,
  //   xField: "type",
  //   yField: "scales",
  //   // seriesField: "type",
  //   // isPercent: true,
  //   // isStack: true,
  //   meta: {
  //     y: {
  //       min: 0,
  //       max: 1,
  //     },
  //   },
  //   label: {
  //     // position: "center",
  //     content: (item) => `${(item.y * 100).toFixed(2)}%`,
  //     style: { fill: "#000" },
  //   },
  //   // colorField: "type",
  //   color: "#19CDD7", // ["#19CDD7", "#DDB27C"],
  // };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex align-content-center justify-content-center gap-3">
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p>
            <h4>$111000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="d-flex gap-2">
              <BsGraphUpArrow />
              32%
            </h6>
            <p className="mb-0">Compared to April 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p>
            <h4>$111000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="d-flex gap-2 red">
              <BsGraphUpArrow />
              32%
            </h6>
            <p className="mb-0">Compared to April 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p>
            <h4>$111000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="d-flex gap-2 green">
              <BsGraphUpArrow />
              32%
            </h6>
            <p className="mb-0">Compared to April 2024</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mt-4">Income Statistics</h3>
        <div>{/* <Column {...config} /> */}</div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />;
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
