import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Layout from "./Layout/Layout";
import Welcome from "./Welcome/Welcome";
//import Footer from "./general/Footer";
import Register from "./User/Register/Register";
import Login from "./User/Login/Login";
import Dashboard from "./Dashboard/Dashboard";
// Bank account links
import AddBankAccount from "./Account/AddBankAccount";
import EditBankAccount from "./Account/EditBankAccount";
// Transaction links
import AddTransaction from "./Transaction/AddTransaction";
import MakeATransfer from "./Transfer/MakeATransfer";

function Main() {
  return (
    <AuthProvider>
      <Switch>
        <Layout path="/transaction/add" component={AddTransaction} />\
        <Layout path="/transfer/add" component={MakeATransfer} />
        <Layout path="/account/add" component={AddBankAccount} />
        <Layout path="/dashboard" component={Dashboard} />
        <Layout path="/register" component={Register} />
        <Layout path="/login" component={Login} />
        <Layout path="/" component={Welcome} />
      </Switch>
    </AuthProvider>
  );
}

export default Main;
