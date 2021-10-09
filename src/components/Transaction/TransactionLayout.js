import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHandHoldingUsd, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function TransactionLayout(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="display-5">Transactions</h1>
        </Col>
        {props.showActions && (
          <Col className="d-flex justify-content-end align-items-end">
            <Link to="transaction/add">
              <Button className="m-1">
                <FaPlus /> Add expense/income
              </Button>
            </Link>
            <Link to="/transfer/add">
              <Button className="m-1">
                <FaHandHoldingUsd /> Make a transfer
              </Button>
            </Link>
          </Col>
        )}
      </Row>
      <hr />
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
}

export default TransactionLayout;
