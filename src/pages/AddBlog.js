import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog, resetState } from "../features/blog/blogClice";
import { deleteImg, uploadImg } from "../features/upload/uploadClice";
import Dropzone from "react-dropzone";
import { getCategories } from "../features/category/categoryClice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const imagestate = useSelector((state) => state.upload.images);
  const categorystate = useSelector((state) => state.category.categories);
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, createblog } = newBlog || {};

  useEffect(() => {
    if (isSuccess && createblog) {
      toast.success("Category Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createblog]);
  const img = [];
  imagestate.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-list");
        dispatch(resetState());
      }, 2000);
    },
  });
  useEffect(() => {
    formik.values.images = img;
  }, [img, formik]);
  return (
    <div>
      <h3 className="mt-4 title">Add Blog</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter blog title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            className="form-control py-3 my-3"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="" disabled>
              Select category
            </option>
            {categorystate.map((item) => (
              <option value={item.title} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            className="mt-3"
            theme="snow"
            name="description"
            onChange={(value) => formik.setFieldValue("description", value)}
            onBlur={() => formik.setFieldTouched("description", true)}
            value={formik.values.description}
            placeholder="Enter product description here..."
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}

          <div className="bg-white border-1 mt-4">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              multiple
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="p-5 text-center">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imagestate?.map((item, index) => (
              <div className="position-relative" key={index}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteImg(item.public_id))}
                  className="btn-close position-absolute bg-white fs-4"
                  style={{ top: "4px", right: "4px" }}
                ></button>
                <img
                  src={item.url}
                  alt={item.public_id}
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>
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
