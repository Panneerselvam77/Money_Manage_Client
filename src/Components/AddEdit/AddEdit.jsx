import React, { useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEdit({
  showeditaddTransactionModel,
  setShoweditaddTransactionMondel,
  getTransaction,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("Money-Manager_user"));
      setLoading(true);
      const responce = await axios.post(
        "http://localhost:8060/transactions/add-transaction",
        { ...values, userid: user._id }
      );
      getTransaction();
      message.success("Transaction Added Successfull");
      setShoweditaddTransactionMondel(false);
      setLoading(false);
      console.log(responce.data.message);

      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went Error");
      console.log(error);
    }
  };
  return (
    <Modal
      title="Add Transaction"
      open={showeditaddTransactionModel}
      onCancel={() => setShoweditaddTransactionMondel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      {/* Using Form For Getiing Data  */}
      <Form layout="vertical" onFinish={onFinish}>
        {/* Amount */}
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        {/* Income or Expance */}
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expence">Expence</Select.Option>
          </Select>
        </Form.Item>
        {/* Select Catagory  */}
        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelace">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="enatertainment">Entertainment</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>
        {/* Date */}
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        {/* Enter Reference */}
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        {/* Enter Discription */}
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        {/* Form Submit */}
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}
