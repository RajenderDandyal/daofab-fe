import React from "react";

function TableRow({ transaction, handleRowClick }) {
  const location = window.location.pathname;
  return (
    <tr key={transaction?.transaction?.id}>
      <td>{transaction?.transaction?.id || ""}</td>
      <td>{transaction?.transaction?.sender || ""}</td>
      <td>{transaction?.transaction?.receiver || ""}</td>

      <td>{transaction?.transaction?.totalAmount || ""}</td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (!location.includes("transaction"))
            handleRowClick(transaction?.transaction?.id);
        }}
      >
        {transaction?.instalments?.reduce((acc, curr) => {
          return acc + curr?.paidAmount;
        }, 0)}
      </td>
    </tr>
  );
}

export default TableRow;
