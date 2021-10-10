import React from "react";
import BankAccounts from "../../components/Account/BankAccounts";
import AccountLayout from "../../components/Account/AccountLayout";

function Accounts() {
  const bankAccounts = ["2342342", "2112223", "11132344"];

  return (
    <AccountLayout showActions={true}>
      <BankAccounts bankAccounts={bankAccounts} title="Active accounts" />
    </AccountLayout>
  );
}

export default Accounts;
