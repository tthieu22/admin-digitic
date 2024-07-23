import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class } = props;
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
      />
      <label htmlFor={type}>{label}</label>
    </div>
  );
};
export default CustomInput;
