import React from "react";
import TransactionForm from "../../components/Transaction/TransactionForm";
import TransactionLayout from "../../components/Transaction/TransactionLayout";

function AddTransaction() {
  return (
    <TransactionLayout>
      <TransactionForm title="Add transaction" />
    </TransactionLayout>
  );
}

export default AddTransaction;
