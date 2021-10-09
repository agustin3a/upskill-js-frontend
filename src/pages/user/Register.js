import React from "react";
import RegisterForm from "../../components/User/Register/RegisterForm";
import { Container, Col, Row } from "react-bootstrap";

function Register() {
  return (
    <>
      <Container className="my-2">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
