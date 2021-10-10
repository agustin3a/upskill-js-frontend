import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../../components/User/Login/LoginForm";

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
