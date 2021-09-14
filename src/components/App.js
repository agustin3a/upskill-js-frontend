import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./general/Navbar";
import Welcome from "./general/welcome/Welcome";
import Footer from "./general/Footer";
import Register from "./user/register/Register";
import Login from "./user/login/Login";

function Main() {
  return (
    <Router>
      <Navbar />
      <Switch>
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
