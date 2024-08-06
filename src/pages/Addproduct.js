import React, { useEffect, useState, useCallback } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandClice";
import { getCategories } from "../features/category/categoryClice";
import { getColors } from "../features/color/colorClice";
import Dropzone from "react-dropzone";
import { Select } from "antd";
import { deleteImg, uploadImg } from "../features/upload/uploadClice";
import { createProduct, resetState } from "../features/product/productClice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Schema validation with Yup
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array().min(1, "At least one tag is required"),
  color: Yup.array()
    .min(1, "At least one color is required")
    .required("Color is required"),
  brand: Yup.string().required("Brand is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  images: Yup.array().min(1, "At least one image is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandstate = useSelector((state) => state.brand.brands);
  const categorystate = useSelector((state) => state.category.categories);
  const colorstate = useSelector((state) => state.color.colors);
  const imagestate = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, createdProduct } = newProduct || {};

  useEffect(() => {
    const colorsArray = colorstate.map((c) => ({
      _id: c._id,
      color: c.title,
    }));
    setColors(colorsArray);
  }, [colorstate]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      tags: [],
      color: [],
      brand: "",
      quantity: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values.images = imagestate.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      }));
      values.color = colors.map((c) => c._id);
      dispatch(createProduct(values));
      formik.resetForm();
      setColors([]);
      setTimeout(() => {
        navigate("/admin/product-list");
        dispatch(resetState());
      }, 3000);
    },
  });

  useEffect(() => {
    const imagesArray = imagestate.map((i) => ({
      public_id: i.public_id,
      url: i.url,
    }));
    setImages(imagesArray);
  }, [imagestate]);

  useEffect(() => {
    if (images !== formik.values.images) {
      formik.setFieldValue("images", images);
    }
  }, [images, formik]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("🦄 Product Added Successfully!");
    }
    if (isError) {
      toast.error("🦄 Something went wrong!");
    }
  }, [isSuccess, isError, createdProduct, navigate, formik]);

  const handleDescChange = useCallback(
    (value) => {
      formik.setFieldValue("description", value);
    },
    [formik]
  );

  const handleColorChange = useCallback(
    (value) => {
      formik.setFieldValue("color", value);
    },
    [formik]
  );

  const handleTagChange = useCallback(
    (value) => {
      formik.setFieldValue("tags", value);
    },
    [formik]
  );

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          label="Enter product title"
          value={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <ReactQuill
          className="mt-3"
          theme="snow"
          onChange={handleDescChange}
          value={formik.values.description}
          placeholder="Enter product description here..."
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <CustomInput
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          type="number"
          label="Enter price"
          i_class="mt-3"
        />
        <div className="error">
          {formik.touched.price && formik.errors.price}
        </div>
        <select
          name="category"
          className="form-control py-3 my-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Tags"
          className="form-control py-3 my-3"
          value={formik.values.tags}
          onChange={handleTagChange}
        >
          <Select.Option value="Featured">Featured</Select.Option>
          <Select.Option value="Popular">Popular</Select.Option>
          <Select.Option value="Special">Special</Select.Option>
        </Select>
        <div className="error">{formik.touched.tags && formik.errors.tags}</div>
        <Select
          placeholder="Select Colors"
          mode="multiple"
          allowClear
          className="w-100"
          name="color"
          options={colors.map((color) => ({
            label: color.color,
            value: color._id,
          }))}
          value={formik.values.color}
          onChange={handleColorChange}
          onBlur={() => formik.setFieldTouched("color", true)}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
        </div>
        <select
          name="brand"
          className="form-control py-3 my-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brand}
        >
          <option value="">Select brand</option>
          {brandstate.map((item) => (
            <option value={item.title} key={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        <div className="error">
          {formik.touched.brand && formik.errors.brand}
        </div>
        <CustomInput
          name="quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
          type="number"
          label="Enter quantity"
          i_class="mt-3"
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
        </div>
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
          {images.map((item) => (
            <div className="position-relative" key={item.public_id}>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
