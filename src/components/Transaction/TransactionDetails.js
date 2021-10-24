import React from "react";
import { FaCheckCircle, FaPlus, FaListUl } from "react-icons/fa";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function TransactionDetails({ title, transaction }) {
  return (
    <>
      <Row>
        <Col>
          <Alert variant="success">
            {" "}
            <FaCheckCircle size="2em" color="green" /> {title}
          </Alert>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <span>
            {" "}
            <strong> Account: </strong>{" "}
          </span>
          <p> { transaction.Account ? `${transaction.Account.number} / ${transaction.Account.holder}` : ""} </p>
          <span>
            {" "}
            <strong> Transaction type: </strong>{" "}
          </span>
          <p> {transaction.expense ? 'Expense' : 'Income'} </p>
          <span>
            {" "}
            <strong> Recipient/Sender: </strong>{" "}
          </span>
          <p> {transaction.recipient} </p>
          <span>
            {" "}
            <strong> Transaction date: </strong>{" "}
          </span>
          <p> {transaction.transaction_date} </p>
          <span>
            {" "}
            <strong> Category: </strong>{" "}
          </span>
          <p> { transaction.Category ? transaction.Category.description : ""} </p>
          <span>
            {" "}
            <strong> Amount: </strong>{" "}
          </span>
          <p> { transaction.Currency ? `${transaction.Currency.code} ${transaction.amount}` : ""} </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="d-flex justify-content-center my-2">
          <Link to="/transactions">
            <Button className="m-1">
              <FaListUl /> Check your transactions
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default TransactionDetails;
