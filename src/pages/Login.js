import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let userSchema = Yup.object({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    // console.log(user);
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [navigate, user, isLoading, isError, isSuccess, message]);
  return (
    <div
      className="d-flex align-items-center"
      style={{
        background: "rgb(200, 200, 200)",
        minHeight: "100vh",
      }}
    >
      <div
        className="my-5 w-25 bg-white rounded-3 p-3 mx-auto"
        style={{ margin: "-20% 0 0 0" }}
      >
        <h4 className="text-center title">Sign In</h4>
        <p className="text-center">Log in your account to continue</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="email"
            type="text"
            label="Email Address"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            name="password"
            type="password"
            label="Password"
            id="pass"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            className="border-0 px-3 py-2 w-100 text-dark text-center mt-3 "
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Submit
          </button>
        </form>
        <Link to="/forgot-password" className="text-secondary ">
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default Login;
