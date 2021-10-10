import React from "react";
import { Switch } from "react-router-dom";
// Store
//import AuthProvider from "../context/AuthProvider";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

import store from "../state/store";
// ----- PAGES
import Layout from "./Layout/Layout";
import Welcome from "./Welcome/Welcome";
//import Footer from "./general/Footer";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Dashboard from "../pages/dashboard/Dashboard";
// Bank account links
import Accounts from "../pages/account/Accounts";
import AddBankAccount from "../pages/account/AddBankAccount";
//import EditBankAccount from "../pages/account/EditBankAccount";
// Transaction links
import AddTransaction from "../pages/transaction/AddTransaction";
import MakeATransfer from "../pages/transfer/MakeATransfer";
import Transactions from "../pages/transaction/Transactions";


firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const rrfConfig = {
  userProfile: 'users'
}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

function Main() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
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
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default Main;
