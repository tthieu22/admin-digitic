import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlogCategory } from "../features/blogcategory/blogcategoryClice";
import { resetState } from "../features/blog/blogClice";

let schema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBlogCategory = useSelector((state) => state.blogcategory);
  const { isSuccess, isError, createblogcategory } = newBlogCategory || {};

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
        dispatch(resetState());
      }, 2000);
    },
  });

  useEffect(() => {
    if (isSuccess && createblogcategory) {
      toast.success("Blog category Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createblogcategory]);
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter blog category title"
          name="title"
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          id="blogcat"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5"
        >
          Add category blog
        </button>
      </form>
    </div>
  );
};

export default Addblogcat;
