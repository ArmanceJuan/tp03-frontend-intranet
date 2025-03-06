import { Space } from "antd";
import React from "react";
import "../../css/form.scss";

const Input = ({ label, name, type, value, onChange }) => {
  return (
    <div className="input-container">
      <Space size={16} direction="horizontal">
        <label htmlFor={name}>{label} :</label>
        <input type={type} name={name} value={value} onChange={onChange} />
      </Space>
    </div>
  );
};

const InputSelectGender = ({ label, name, value, onChange }) => {
  return (
    <div className="input-container">
      <Space size={16} direction="horizontal">
        <label htmlFor={name}>{label} :</label>
        <select name={name} value={value} onChange={onChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="female">Other</option>
        </select>
      </Space>
    </div>
  );
};

const InputSelectCategory = ({ label, name, value, onChange }) => {
  return (
    <div className="input-container">
      <Space size={16} direction="horizontal">
        <label htmlFor={name}>{label} :</label>
        <select name={name} value={value} onChange={onChange}>
          <option value="Marketing">Marketing</option>
          <option value="Technique">Technique</option>
          <option value="Client">Client</option>
        </select>
      </Space>
    </div>
  );
};

export { Input, InputSelectGender, InputSelectCategory };
