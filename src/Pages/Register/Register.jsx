import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moneyAnimy from "../../Resources/Animation - 1699372663650.json";
import Lottie from "lottie-react";
import "./register.css";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const responce = await axios.post(
        "http://localhost:8060/user/register",
        values
      );
      setLoading(false);
      console.log(responce.data.message);
      message.success("Registeration Successfull");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went Error");
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Money-Manager_user")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5">
          <Lottie className="lottie" animationData={moneyAnimy} loop={true} />
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1 style={{ marginBottom: 20, textAlign: "left" }}>Register !!</h1>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter name ..." />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter email ..." />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter password ..." />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered, Click Here To Login</Link>
              <button className="primary" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
