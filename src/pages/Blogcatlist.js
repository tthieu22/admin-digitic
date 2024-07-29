import React, { useEffect } from "react";
import { Table } from "antd";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategorys } from "../features/blogcategory/blogcategoryClice";

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
const BlogCatList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategorys());
  }, [dispatch]);
  const blogcatstate = useSelector(
    (state) => state.blogcategory.blogcategories
  );
  const data = [];
  for (let i = 0; i < blogcatstate.length; i++) {
    data.push({
      key: i,
      title: blogcatstate[i].title,
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
        <h3 className="mb-4 title">Blog Categories List</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default BlogCatList;
