import React from "react";
import Navbar from "./Navbar";
import { Route, matchPath, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ exact, path, component: Component, ...props }) {
  const auth = useSelector((state) => state.firebase.auth);
  const user = useSelector((state) => state.user);

  

  return (
    <>
      {auth.isLoaded && (
        <Route
          exact={props.exact}
          path={path}
          render={() => {
            const matchPaths = (matchPath(path, { path: "/", exact: true, strict: true }) || matchPath(path, "/login") || matchPath(path, "/register"));
            const userPages = (
              <div>
                <Navbar />
                <main>
                  <Component {...props} />
                </main>
              </div>
            );
            if ( !auth.isEmpty && matchPaths) return <Redirect to="/dashboard" />;
            if (auth.isEmpty && !matchPaths) return <Redirect to="/" />;
            return userPages;
          }}
        ></Route>
      )}
    </>
  );
}

export default Layout;
