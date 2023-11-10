import React from "react";
import "./default-layout.css";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

export default function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Money-Manager_user"));

  const items = [
    {
      key: "1",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("Money-Manager_user");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="header">
        <div>
          <h1 className="logo" onClick={() => navigate("/")}>
            Share-Money
          </h1>
        </div>
        <div className="username">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <button className="primary">
              {" "}
              <em> {user.name}</em>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="contents">{props.children}</div>
    </div>
  );
}
