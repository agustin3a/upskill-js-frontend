import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TransactionsHistory from "./TransactionsHistory";
import BankAccounts from "./BankAccounts";
import Actions from "./Actions";
import TransactionsChart from "./TransactionsChart";

function Dashboard() {
  // Bank accounts
  const bankAccounts = ["2342342", "2112223", "11132344"];

  return (
    <Container>
      <Row>
        <Col>
          <Actions />
        </Col>
      </Row>
      <Row>
        <Col>
          <BankAccounts bankAccounts={bankAccounts} />
        </Col>
        <Col>
            <TransactionsChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <TransactionsHistory title="Transactions history" />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
