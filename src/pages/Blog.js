import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogClice";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "View",
    dataIndex: "numViews",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const blogstate = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < blogstate.length; i++) {
    data.push({
      key: i,
      title: blogstate[i].title,
      category: blogstate[i].category,
      numViews: blogstate[i].numViews,
      author: blogstate[i].author,

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
        <h3 className="mb-4 title">Blogs List</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Blog;
