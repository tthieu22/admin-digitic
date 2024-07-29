import React, { useState, useRef } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddBlog = () => {
  const [desc, setDesc] = useState("");
  const quillRef = useRef(null); // Tạo ref cho ReactQuill

  const handleDesc = (e) => {
    setDesc(e); // Cập nhật giá trị của desc
  };

  return (
    <div>
      <h3 className="mt-4 title">Add Blog</h3>
      <div>
        <form action="">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <CustomInput type="text" label="Enter blog title" />
          <select name="" id="" className="form-control py-3 my-3">
            <option value="">Select blog category</option>
          </select>
          <ReactQuill
            ref={quillRef} // Gán ref cho ReactQuill
            theme="snow"
            value={desc}
            onChange={handleDesc}
          />
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
