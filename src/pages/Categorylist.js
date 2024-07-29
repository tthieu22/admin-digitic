import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/categoryClice";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Categorylist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categorystate = useSelector((state) => state.category.categories);
  const data = [];
  for (let i = 0; i < categorystate.length; i++) {
    data.push({
      key: i,
      title: categorystate[i].title,
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
        <h3 className="mb-4 title">Categorylist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Categorylist;
