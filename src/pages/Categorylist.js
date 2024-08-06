import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteaCategory,
  getCategories,
} from "../features/category/categoryClice";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../components/CustomModal";

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
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

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
          <Link
            to={`/admin/category/${categorystate[i]._id}`}
            className="text-dark"
          >
            <FaEdit className="fs-4" />
          </Link>
          <button
            className="text-dark border-0 bg-transparent"
            onClick={() => showModal(categorystate[i]._id)}
          >
            <MdDeleteForever className="fs-4" />
          </button>
        </div>
      ),
    });
  }

  const deleteCategory = (e) => {
    setOpen(false);
    dispatch(deleteaCategory(e));
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="mb-4 title">Categorylist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default Categorylist;
