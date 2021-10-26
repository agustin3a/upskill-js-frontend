import React from "react";
import { FaCheckCircle, FaPlus, FaListUl } from "react-icons/fa";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "moment";

function TransactionDetails(props) {
  const { transaction, showActions } = props;

  return (
    <>
      <Row>
        <Col>
          <span>
            {" "}
            <strong> Account: </strong>{" "}
          </span>
          <p>
            {" "}
            {transaction.Account
              ? `${transaction.Account.number} / ${transaction.Account.holder}`
              : ""}{" "}
          </p>
          <span>
            {" "}
            <strong> Transaction type: </strong>{" "}
          </span>
          <p> {transaction.expense ? "Expense" : "Income"} </p>
          <span>
            {" "}
            <strong> Recipient/Sender: </strong>{" "}
          </span>
          <p> {transaction.recipient} </p>
          <span>
            {" "}
            <strong> Transaction date: </strong>{" "}
          </span>
          <p> {Moment(transaction.transaction_date).format("LL")} </p>
          <span>
            {" "}
            <strong> Category: </strong>{" "}
          </span>
          <p>
            {" "}
            {transaction.Category ? transaction.Category.description : ""}{" "}
          </p>
          <span>
            {" "}
            <strong> Amount: </strong>{" "}
          </span>
          <p>
            {" "}
            {transaction.Currency
              ? `${transaction.Currency.code} ${transaction.amount}`
              : ""}{" "}
          </p>
        </Col>
      </Row>
      {showActions && (
        <>
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
      )}
    </>
  );
}

export default TransactionDetails;
