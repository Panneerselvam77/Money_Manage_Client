import React from "react";
import "./analytics.css";
import { Progress } from "antd";

export default function Analytics({ transactions }) {
  /* 
    Below all  For Transaction Count
 */
  // Total Transactions
  const totalTransactions = transactions.length;
  //   Total Income
  const totalIncomeTransaction = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  //   Total Expence
  const totalExpenceTransaction = transactions.filter(
    (transaction) => transaction.type === "expence"
  );
  /* Income Percentage */
  const totalIncomeTransactionPercentage =
    (totalIncomeTransaction.length / totalTransactions) * 100;
  /* Expence Percentage */
  const totalExpenceTransactionPercentage =
    (totalExpenceTransaction.length / totalTransactions) * 100;

  /* 
    Below all  For TurnOver
 */
  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  //   console.log(totalTurnOver);
  const totalIncomeTurnOver = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  //   console.log(totalIncomeTurnOver);
  const totalExpenceTurnOver = transactions
    .filter((transaction) => transaction.type === "expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  //   console.log(totalExpenceTurnOver);
  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;

  const totalExpenceTurnOverPercentage =
    (totalExpenceTurnOver / totalTurnOver) * 100;

  const catagories = [
    "salary",
    "entertainement",
    "freelance",
    "food",
    "travel",
    "investment",
    "education",
    "medical",
    "tax",
  ];
  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4">
          <div className="transaction-count">
            <h4>Total Transactions: {totalTransactions}</h4>
            <hr />
            <div style={{ textAlign: "left" }}>
              <h5>Income: {totalIncomeTransaction.length}</h5>
              <h5>Expence: {totalExpenceTransaction.length}</h5>
              <div className="progress-bars">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  percent={totalIncomeTransactionPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  percent={totalExpenceTransactionPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="transaction-count ">
            <h4>Total Turnover: {totalTurnOver}</h4>
            <hr />
            <div style={{ textAlign: "left" }}>
              <h5>Income: {totalIncomeTurnOver}</h5>
              <h5>Expence: {totalExpenceTurnOver}</h5>
              <div className="progress-bars">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  percent={totalIncomeTurnOverPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  percent={totalExpenceTurnOverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="income-catagory-analytics">
            <h3>Income - Catagory wise</h3>
            {catagories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expence" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                <div className="catagory-card">
                  <h5>{category}</h5>
                  <Progress
                    percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)}
                    type="line"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
