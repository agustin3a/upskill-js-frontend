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
        const matchPaths = (matchPath(path, { path: "/", exact: true, strict: true }) || matchPath(path, "/login") || matchPath(path, "/register")) ? true : false;
        const userPages = (
          <div>
            <Navbar />
            <main>
              <Component {...props} />
            </main>
          </div>
        );
        if ( authCtx.currentUser && matchPaths) return <Redirect to="/dashboard" />;
        if (!authCtx.currentUser && !matchPaths) return <Redirect to="/" />;
        return userPages;
      }}
    ></Route>
  );
}

export default Layout;
