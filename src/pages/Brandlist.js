import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandClice";
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
];
const Brandlist = () => {
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
        <h3 className="mb-4 title">Brandlist</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Brandlist;
