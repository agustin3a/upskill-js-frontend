import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Route, matchPath, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { Row, Col } from "react-bootstrap";

function Layout({ exact, path, component: Component, ...props }) {
  const authCtx = useContext(AuthContext);

  return (
    <Route
      exact={props.exact}
      path={path}
      render={() => {
        const userPages = (
          <div>
            <Navbar />
            <Row className="mb-5">
              <Col>
                <br />
              </Col>
            </Row>
            <main>
              <Component {...props} />
            </main>
          </div>
        );
        if (
          authCtx.currentUser &&
          (matchPath(path, { path: "/", exact: true }) ||
            matchPath(path, "/login") ||
            matchPath(path, "/register"))
        )
          return <Redirect to="/dashboard" />;
        if (
          !authCtx.currentUser &&
          !(
            matchPath(path, { path: "/", exact: true }) ||
            matchPath(path, "/login") ||
            matchPath(path, "/register")
          )
        )
          return <Redirect to="/" />;
        return userPages;
      }}
    ></Route>
  );
}

export default Layout;
