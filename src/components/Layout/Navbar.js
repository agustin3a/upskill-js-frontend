import React, { useContext } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Navbar() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    authCtx.logout();
    history.push("/");
  };

  return (
    <>
      <BootstrapNavbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="mb-3"
      >
        <Container>
          <Link
            className="navbar-brand"
            to={authCtx.currentUser ? "/dashboard" : "/"}
          >
            <img
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            Budget
          </Link>
          <BootstrapNavbar.Toggle />

          {authCtx.currentUser && (
            <>
              <Nav className="me-auto">
                <Link to="/accounts" className="nav-link">
                  Accounts
                </Link>
                <Link to="/transactions" className="nav-link">
                  Transactions
                </Link>
              </Nav>
              <Nav className="me-right">
                <NavDropdown
                  title={authCtx.currentUser && authCtx.currentUser.email}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
