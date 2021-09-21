import React from 'react'
import { Container, Row, Col, Image } from "react-bootstrap";
import BankAccountForm from './BankAccountForm';

function AddBankAccount() {
    return (
        <>
      <Container className="my-2">
        <Row className="d-flex justify-content-center">
          <Col>
            <BankAccountForm />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default AddBankAccount
