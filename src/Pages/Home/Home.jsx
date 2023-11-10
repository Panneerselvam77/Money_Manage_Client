import React, { useState } from "react";
import DefaultLayout from "../../Components/DefaultLayout/DefaultLayout";
import "./transaction.css";
import { Form, Input, Modal, Select } from "antd";

export default function Home() {
  const [showeditaddTransactionModel, setShoweditaddTransactionMondel] =
    useState(false);
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
        <div></div>
        {/*  */}
        <button
          className="primary"
          style={{ width: 120 }}
          onClick={() => setShoweditaddTransactionMondel(true)}
        >
          Add New
        </button>
      </div>
      {/*  */}
      <div className="table-analytics"></div>
      {/* Modal for POP up  */}
      <Modal
        title="Add Transaction"
        open={showeditaddTransactionModel}
        onCancel={() => setShoweditaddTransactionMondel(false)}
        footer={false}
      >
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
              <Select.Option value="enatertainment">
                Entertainment
              </Select.Option>
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
    </DefaultLayout>
  );
}
