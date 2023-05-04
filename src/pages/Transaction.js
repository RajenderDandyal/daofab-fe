import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TableRow from "../components/TableRow";

import axios from "../axios";
import "./page.css";

const Transaction = () => {
  const { id } = useParams();
  const [transaction, seTransaction] = useState();

  useEffect(() => {
    axios.get(`/transactions/${id}`).then((resp) => {
      seTransaction(resp.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Transaction {" " + id}</h1>
      <h4>{transaction ? null : "Loading..."}</h4>
      <table className="tableBody">
        <tr>
          <th>ID</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Total Amount</th>
          <th>Paid Amount</th>
        </tr>
        <TableRow transaction={transaction} />
        {/* <tr key={transaction?.transaction?.id}>
          <td>{transaction?.transaction?.id || ""}</td>
          <td>{transaction?.transaction?.sender || ""}</td>
          <td>{transaction?.transaction?.receiver || ""}</td>

          <td>{transaction?.transaction?.totalAmount || ""}</td>
          <td>
            {transaction?.instalments?.reduce((acc, curr) => {
              return acc + curr?.paidAmount;
            }, 0)}
          </td>
        </tr> */}
      </table>
    </div>
  );
};

export default Transaction;
