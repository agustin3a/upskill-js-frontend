import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./general/Navbar";
import Welcome from "./general/welcome/Welcome";
//import Footer from "./general/Footer";
import Register from "./user/register/Register";
import Login from "./user/login/Login";
import Dashboard from "./dashboard/Dashboard";
// Bank account links
import AddBankAccount from "./account/AddBankAccount";
import EditBankAccount from "./account/EditBankAccount";
// Transaction links
import AddTransaction from "./transaction/AddTransaction";
import MakeATransfer from "./transfer/MakeATransfer";

function Main() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/transaction/add">
          <AddTransaction />
        </Route>
        <Route path="/transfer/add">
          <MakeATransfer />
        </Route>
        <Route path="/account/add">
          <AddBankAccount />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}

export default Main;
