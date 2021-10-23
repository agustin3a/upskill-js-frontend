import React from "react";
import { FaCheckCircle, FaPlus, FaListUl } from "react-icons/fa";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccountDetails(props) {
  return (
    <>
      <Row>
        <Col>
          <Alert variant="success">
            {" "}
            <FaCheckCircle size="2em" color="green" /> {props.title}
          </Alert>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <span>
            {" "}
            <strong> Holder: </strong>{" "}
          </span>
          <p> {props.account.holder} </p>
          <span>
            {" "}
            <strong> Bank: </strong>{" "}
          </span>
          <p> {props.account.bank} </p>
          <span>
            {" "}
            <strong> Number: </strong>{" "}
          </span>
          <p> {props.account.number} </p>
          <span>
            {" "}
            <strong> Type: </strong>{" "}
          </span>
          <p> {props.account.AccountType.description} </p>
          <span>
            {" "}
            <strong> Currency: </strong>{" "}
          </span>
          <p> {props.account.Currency.code} </p>
          <span>
            {" "}
            <strong> Balance: </strong>{" "}
          </span>
          <p> {props.account.balance} </p>
          <span>
            {" "}
            <strong> Status: </strong>{" "}
          </span>
          <p> {props.account.active ? "Active" : "Inactive"} </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="d-flex justify-content-center my-2">
          <Link to="/accounts">
            <Button className="m-1">
              <FaListUl /> Check your accounts
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default AccountDetails;
