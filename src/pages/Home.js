import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import TableRow from "../components/TableRow";

import axios from "../axios";
import "./page.css";

const Home = () => {
  const [transactions, setTransactions] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [orderDesc, setOrderDesc] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/transactions?pageNumber=${pageNumber}`).then((resp) => {
      setTransactions(resp.data);
    });
  }, []);

  const pagination = [];
  for (let i = 1; i <= transactions?.totalPages; i++) {
    pagination.push(i);
  }

  const handlePageClick = (index) => {
    const newPage = index - 1;
    setPageNumber(newPage);
    axios.get(`/transactions?pageNumber=${newPage}`).then((resp) => {
      setTransactions(resp.data);
    });
  };

  const handleRowClick = (id) => {
    navigate(`/transaction/${id}`);
  };

  const sortById = () => {
    const transactionsCopy = cloneDeep(transactions);
    transactionsCopy.transactions.sort((a, b) =>
      orderDesc
        ? b.transaction.id - a.transaction.id
        : a.transaction.id - b.transaction.id
    );
    setTransactions(transactionsCopy);
    setOrderDesc(!orderDesc);
  };

  return (
    <div className="container">
      <table className="tableBody">
        <tr>
          <th style={{ cursor: "pointer" }} onClick={sortById}>
            ID
          </th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Total Amount</th>
          <th>Total Paid Amount</th>
        </tr>
        {transactions?.transactions?.map((item) => {
          return (
            <TableRow transaction={item} handleRowClick={handleRowClick} />
          );
        })}
      </table>

      <div className="pageination-container">
        {pagination?.map((index) => {
          return (
            <span
              onClick={() => handlePageClick(index)}
              className={`page-number ${
                pageNumber === index - 1 ? "selected-page" : ""
              }`}
            >
              <strong>{index}</strong>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
