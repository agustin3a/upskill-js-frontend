import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TransactionsHistory from "./TransactionsHistory";
import BankAccounts from "./BankAccounts";

function Dashboard() {
  // Bank accounts
  const bankAccounts = ["2342342", "2112223", "11132344"];

  return (
    <Container>
      <Row>
        <Col>
          <h1> Welcome Banner </h1>
        </Col>
        <Col>
          <h1> Options </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <BankAccounts bankAccounts={bankAccounts}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <TransactionsHistory />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
