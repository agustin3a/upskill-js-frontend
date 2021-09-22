import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <Container className="my-2">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;