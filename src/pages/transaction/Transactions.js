import React from "react";
import TransactionsHistory from "../../components/Transaction/TransactionsHistory";
import TransactionLayout from "../../components/Transaction/TransactionLayout";

function Transactions() {
  return (
    <TransactionLayout showActions>
      <TransactionsHistory title="History" showFilter={true}/>
    </TransactionLayout>
  );
}

export default Transactions;
