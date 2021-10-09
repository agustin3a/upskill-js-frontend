import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Layout from "./Layout/Layout";
import Welcome from "./Welcome/Welcome";
//import Footer from "./general/Footer";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Dashboard from "../pages/dashboard/Dashboard";
// Bank account links
import Accounts from "../pages/account/Accounts";
import AddBankAccount from "../pages/account/AddBankAccount";
import EditBankAccount from "../pages/account/EditBankAccount";
// Transaction links
import AddTransaction from "../pages/transaction/AddTransaction";
import MakeATransfer from "../pages/transfer/MakeATransfer";
import Transactions from "../pages/transaction/Transactions";

function Main() {
  return (
    <AuthProvider>
      <Switch>
        <Layout exact path="/accounts" component={Accounts} />
        <Layout exact path="/transactions" component={Transactions} />
        <Layout exact path="/transaction/add" component={AddTransaction} />
        <Layout exact path="/transfer/add" component={MakeATransfer} />
        <Layout exact path="/account/add" component={AddBankAccount} />
        <Layout exact path="/dashboard" component={Dashboard} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/login" component={Login} />
        <Layout exact path="/" component={Welcome} />
      </Switch>
    </AuthProvider>
  );
}

export default Main;
