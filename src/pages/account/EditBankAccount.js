import React from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import BankAccountEditForm from "../../components/Account/BankAccountEditForm";
import { useParams } from "react-router-dom";

function EditBankAccount() {
  let { id } = useParams();

  return (
    <AccountLayout>
      <BankAccountEditForm accountId={id} />
    </AccountLayout>
  );
}

export default EditBankAccount;
