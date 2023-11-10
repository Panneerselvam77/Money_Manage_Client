import React from "react";
import { Spin } from "antd";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  );
}
