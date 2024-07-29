import React, { useEffect } from "react";
import { Table } from "antd";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorClice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Colorlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorstate = useSelector((state) => state.color.colors);
  const data = [];
  for (let i = 0; i < colorstate.length; i++) {
    data.push({
      key: i,
      title: colorstate[i].title,
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
  return (
    <div>
      <div>
        <h3 className="mb-4 title">Colorlist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Colorlist;
