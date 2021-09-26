import React from "react";
import TransactionsHistory from "../../components/Transaction/TransactionsHistory";
import TransactionLayout from "../../components/Transaction/TransactionLayout";

function Transactions() {
  return (
    <TransactionLayout showActions>
      <TransactionsHistory title="History" />
    </TransactionLayout>
  );
}

export default Transactions;
