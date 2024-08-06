import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteaBrand, getBrands } from "../features/brand/brandClice";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
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

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const brandstate = useSelector((state) => state.brand.brands);
  const data = [];
  
  for (let i = 0; i < brandstate.length; i++) {
    data.push({
      key: i,
      title: brandstate[i].title,
      action: (
        <div className="d-flex gap-3">
          <Link to={`/admin/brand/${brandstate[i]._id}`} className="text-dark">
            <FaEdit className="fs-4" />
          </Link>
          <button
            className="text-dark border-0 bg-transparent"
            onClick={() => showModal(brandstate[i]._id)}
          >
            <MdDeleteForever className="fs-4" />
          </button>
        </div>
      ),
    });
  }

  const deleteBrand = (e) => {
    setOpen(false);
    dispatch(deleteaBrand(e));
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="mb-4 title">Brandlist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
