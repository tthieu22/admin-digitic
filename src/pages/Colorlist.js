import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteaColor, getColors } from "../features/color/colorClice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

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
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorstate = useSelector((state) => state.color.colors);
  const data = [];

  const { isSuccess, isError, deletecolor } = colorstate || {};

  for (let i = 0; i < colorstate.length; i++) {
    data.push({
      key: i,
      title: colorstate[i].title,
      action: (
        <div className="d-flex gap-3">
          <Link to={`/admin/color/${colorstate[i]._id}`} className="text-dark">
            <FaEdit className="fs-4" />
          </Link>
          <button
            className="text-dark border-0 bg-transparent"
            onClick={() => showModal(colorstate[i]._id)}
          >
            <MdDeleteForever className="fs-4" />
          </button>
        </div>
      ),
    });
  }
  const deleteColor = (e) => {
    setOpen(false);
    dispatch(deleteaColor(e));
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  useEffect(() => {
    if (isSuccess) {
      if (deletecolor) {
        toast.success("Color delete successfully!");
      }
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, deletecolor]);

  return (
    <div>
      <div>
        <h3 className="mb-4 title">Colorlist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Colorlist;
