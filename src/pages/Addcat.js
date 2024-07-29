import React from "react";
import CustomInput from "../components/CustomInput";

const Addcat = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <form action="">
        <CustomInput type="text" label="Enter category title" />
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5"
        >
          Add category
        </button>
      </form>
    </div>
  );
};

export default Addcat;
