import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { getEnquiries } from "../features/enquiries/enquiriesClice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiriesstate = useSelector((state) => state.enquiry.enquiries);
  const data = [];
  for (let i = 0; i < enquiriesstate.length; i++) {
    data.push({
      key: i,
      name: enquiriesstate[i].name,
      email: enquiriesstate[i].email,
      mobile: enquiriesstate[i].mobile,
      comment: enquiriesstate[i].comment,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option>Set status</option>
            <option>Submited</option>
          </select>
        </>
      ),
      action: (
        <div className="d-flex gap-3">
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
        <h3 className="mb-4 title">Enquirires</h3>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
