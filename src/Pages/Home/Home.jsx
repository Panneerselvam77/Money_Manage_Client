import React, { useEffect, useState } from "react";
import DefaultLayout from "../../Components/DefaultLayout/DefaultLayout";
import AddEdit from "../../Components/AddEdit/AddEdit";
import Spinner from "../../Components/Spinner/Spinner";
import Analytics from "../../Components/Analytics/Analytics";
import "./transaction.css";
import axios from "axios";
import moment from "moment";
import { Select, Table, message, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

// DatePicket
const { RangePicker } = DatePicker;

export default function Home() {
  /*  State For Loading */
  const [loading, setLoading] = useState(false);
  const [showeditaddTransactionModel, setShoweditaddTransactionMondel] =
    useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectRange, setSelectRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  /* Function For Fetching API */
  const getTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("Money-Manager_user"));
      setLoading(true);
      const responce = await axios.post(
        "http://localhost:8060/transactions/get-all-transactions",
        {
          useid: user._id,
          frequency,
          ...(frequency === "custom" && { selectRange }),
          type,
        }
      );
      setTransactionData(responce.data.Transaction);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went Error");
      console.log(error);
    }
  };

  /* Function For Deleting Transaction  */
  const deletedTransaction = async (record) => {
    try {
      setLoading(true);
      const responce = await axios.post(
        "http://localhost:8060/transactions/delete-transaction",
        {
          transactionId: record._id,
        }
      );
      console.log(responce);
      message.success("Transaction Deleted Sucessfully");
      getTransaction();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went Error");
      console.log(error);
    }
  };

  // UseEffect
  useEffect(() => {
    getTransaction();
    // eslint-disable-next-line
  }, [frequency, selectRange, type]);

  /* Columns For Table Content input */
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{moment(date).utc().format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            {/* Edit Button */}
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShoweditaddTransactionMondel(true);
              }}
            />
            {/* Delete Button */}
            <DeleteOutlined
              className="mx-4"
              onClick={() => {
                deletedTransaction(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      {/* Filter Section */}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column align-items-center">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <div className="mt-1">
                <RangePicker
                  value={selectRange}
                  onChange={(value) => setSelectRange(value)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column align-items-center mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expence">Expence</Select.Option>
            </Select>
          </div>
        </div>
        {/* Graphic Button */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="viw-switch mx-3 d-flex justify-content-between align-items-center">
              <UnorderedListOutlined
                className={`mx-2 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={` mx-1 ${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          {/* ADD button */}
          <button
            className="primary"
            style={{ width: 120 }}
            onClick={() => setShoweditaddTransactionMondel(true)}
          >
            Add New
          </button>
        </div>
      </div>
      {/* Data Table with All Details  */}
      <div className="table-analytics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionData} />
          </div>
        ) : (
          <Analytics transactions={transactionData} />
        )}
      </div>
      {/* Modal for POP up  */}
      {showeditaddTransactionModel && (
        <AddEdit
          setShoweditaddTransactionMondel={setShoweditaddTransactionMondel}
          showeditaddTransactionModel={showeditaddTransactionModel}
          getTransaction={getTransaction}
          setSelectedItemForEdit={setSelectedItemForEdit}
          selectedItemForEdit={selectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}
