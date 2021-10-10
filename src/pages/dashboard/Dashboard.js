import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TransactionsHistory from "../../components/Transaction/TransactionsHistory";
import BankAccounts from "../../components/Account/BankAccounts";
import QuickLinks from "../../components/Dashboard/QuickLinks";
//import TransactionsChart from "../../components/Dashboard/TransactionsChart";

function Dashboard() {
  // Bank accounts
  const bankAccounts = ["2342342", "2112223", "11132344"];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <QuickLinks />
          </Col>
        </Row>
        <Row>
          <Col>
            <BankAccounts bankAccounts={bankAccounts} title="Bank accounts" />
          </Col>
        </Row>
        <Row>
          <Col>
            <TransactionsHistory title="Latest transactions" showFilter={false}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
