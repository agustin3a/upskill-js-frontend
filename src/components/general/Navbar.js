import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";

function Navbar() {
  return (
    <>
      <BootstrapNavbar  expand="lg" bg="dark" variant="dark">
        <Container>
          <BootstrapNavbar.Brand href="/">
            <img
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            Budget
          </BootstrapNavbar.Brand>
        </Container>
      </BootstrapNavbar>
      <br></br>
    </>
  );
}

export default Navbar;
