import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../features/brand/brandClice";
import { getCategories } from "../features/category/categoryClice";
import { getColors } from "../features/color/colorClice";
import Multiselect from "react-widgets/Multiselect";
import Dropzone from "react-dropzone";

import "react-widgets/styles.css";

// Schema validation with Yup
let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
  color: Yup.array().min(1, "At least one color is required"),
  brand: Yup.string().required("Brand is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be positive"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandstate = useSelector((state) => state.brand.brands);
  const categorystate = useSelector((state) => state.category.categories);
  const colorstate = useSelector((state) => state.color.colors);

  const colors = colorstate.map((i) => ({
    _id: i._id,
    color: i.title,
  }));

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      color: [],
      brand: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Implement your submission logic here
      console.log(values);
      navigate("/products");
    },
  });

  // Update product description
  const handleDescChange = (value) => {
    formik.setFieldValue("description", value);
  };

  // Update selected colors
  const handleColorChange = (value) => {
    formik.setFieldValue("color", value);
  };

  // Custom blur handler for Multiselect
  const handleColorBlur = () => {
    formik.setFieldTouched("color", true);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
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
            <option value="">Select category</option>
            {categorystate.map((item, j) => (
              <option value={item.title} key={j}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <Multiselect
            placeholder="Select Colors"
            name="color"
            dataKey="_id"
            textField="color"
            data={colors}
            value={formik.values.color}
            onChange={handleColorChange}
            onBlur={handleColorBlur}
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
            {brandstate.map((item, j) => (
              <option value={item.title} key={j}>
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
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
