import React from "react";
import TransactionLayout from "../../components/Transaction/TransactionLayout";
import TransactionEditForm from "../../components/Transaction/TransactionEditForm";
import { useParams } from "react-router-dom";

function EditTransaction() {
  let { id } = useParams();

  return (
    <TransactionLayout>
      <TransactionEditForm transactionId={id} />
    </TransactionLayout>
  );
}

export default EditTransaction;
