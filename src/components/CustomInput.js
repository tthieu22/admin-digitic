import React from "react";

const CustomInput = (props) => {
  const { name, onChange, onBlur, type, label, value, i_class } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
      />
      <label htmlFor={type}>{label}</label>
    </div>
  );
};
export default CustomInput;
