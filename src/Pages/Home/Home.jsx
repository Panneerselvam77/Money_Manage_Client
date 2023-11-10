import React, { useState } from "react";
import DefaultLayout from "../../Components/DefaultLayout/DefaultLayout";
import "./transaction.css";
import AddEdit from "../../Components/AddEdit/AddEdit";

export default function Home() {
  const [showeditaddTransactionModel, setShoweditaddTransactionMondel] =
    useState(false);

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
      {showeditaddTransactionModel && (
        <AddEdit
          setShoweditaddTransactionMondel={setShoweditaddTransactionMondel}
          showeditaddTransactionModel={showeditaddTransactionModel}
        />
      )}
    </DefaultLayout>
  );
}
