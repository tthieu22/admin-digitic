import React from "react";
import CustomInput from "../components/CustomInput";
const Forgotpassword = () => {
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
        <h4 className="text-center">Sign In</h4>
        <p className="text-center">Log in your account to continue</p>
        <form action="">
          <CustomInput type="email" label="Email Address" id="pass" />
          <button
            className="border-0 px-3 py-2 w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
