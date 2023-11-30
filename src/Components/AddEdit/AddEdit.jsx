import React, { useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "axios";
import { Form, Input, Modal, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Global-url";

export default function AddEdit({
  showeditaddTransactionModel,
  setShoweditaddTransactionMondel,
  getTransaction,
  setSelectedItemForEdit,
  selectedItemForEdit,
}) {
  /* Use State */
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* Function */
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("Money-Manager_user"));
      setLoading(true);
      if (selectedItemForEdit) {
        const Editresponce = await axios.post(
          `${URL}/transactions/edit-transaction`,
          {
            payload: {
              ...values,
              userid: user._id,
            },
            transactionId: selectedItemForEdit._id,
          }
        );

        message.success("Transaction Updated Successfull");
        console.log(Editresponce);
      } else {
        const Addresponce = await axios.post(
          `${URL}/transactions/add-transaction`,
          { ...values, userid: user._id }
        );
        message.success("Transaction Added Successfull");
        console.log(Addresponce);
      }
      getTransaction();
      setShoweditaddTransactionMondel(false);
      setSelectedItemForEdit(null);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went Error");
      console.log(error);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showeditaddTransactionModel}
      onCancel={() => setShoweditaddTransactionMondel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      {/* Using Form For Getiing Data  */}
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
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
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainement">Entertainment</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
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
