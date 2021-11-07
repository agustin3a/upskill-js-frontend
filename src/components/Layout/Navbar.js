import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

function Navbar() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      firebase.logout();
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BootstrapNavbar expand="lg" bg="dark" variant="dark" className="mb-3">
        <Container>
          <Link
            className="navbar-brand"
            to={!auth.isEmpty ? "/dashboard" : "/"}
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

          {!auth.isEmpty && (
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
                  title={!auth.isEmpty && auth.email}
                  id="navbarScrollingDropdown"
                >
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
