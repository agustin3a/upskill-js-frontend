import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  FaShoppingBag,
  FaRegPlusSquare,
  FaRegMinusSquare,
  FaGift,
  FaTaxi,
  FaTv,
  FaHandHoldingUsd,
  FaMoneyBillAlt,
  FaPills,
  FaBookReader,
  FaReceipt,
} from "react-icons/fa";

function TransactionItem(props) {
  const getCategoryIcon = (category) => {
    let size = "2em";
    let categoryIcon = <FaMoneyBillAlt size={size} />;
    switch (category) {
      case "Groceries":
        categoryIcon = <FaShoppingBag size={size} />;
        break;
      case "Entertainment":
        categoryIcon = <FaTv size={size} />;
        break;
      case "Transfer":
        categoryIcon = <FaHandHoldingUsd size={size} />;
        break;
      case "Transport":
        categoryIcon = <FaTaxi size={size} />;
        break;
      case "Gifts":
        categoryIcon = <FaGift size={size} />;
        break;
      case "Medicine":
        categoryIcon = <FaPills size={size} />;
        break;
      case "Studies":
        categoryIcon = <FaBookReader size={size} />;
        break;
      case "Services":
        categoryIcon = <FaReceipt size={size} />;
        break;
    }

    return categoryIcon;
  };

  return (
    <Card className="mb-3" border={(props.transactionType === 'Expense') ? 'danger' : 'primary'}>
      <Card.Header className={ (props.transactionType === 'Expense') ? 'bg-danger py-1' : 'bg-primary py-1'}>
       
      </Card.Header>
      <Card.Body className="py-1">
        <Row>
          <Col>
            <Row>
              <Col md="auto" className="d-flex align-items-center">
                {getCategoryIcon(props.category)}
              </Col>
              <Col className="text-start">
                <span className="fs-5"> {props.targetAccountName} </span>{" "}
                <br />
                <span className="fst-italic fw-bold"> Category: </span>{" "}
                <span className="fw-normal"> {props.category} </span> <br />
                <span className="fst-italic fw-bold"> Bank account: </span>{" "}
                <span className="fw-normal"> {props.bankAccount} </span> <br />
                <span className="fst-italic fw-bold"> Date: </span>{" "}
                <span className="fw-normal"> {"09/15/2021 09:30"} </span>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-end flex-column align-items-end">

            <h6
              className={
                props.transactionType === "Expense"
                  ? "text-danger"
                  : "text-primary"
              }
            >
              {props.transactionType}
              {" / "}
              {props.transactionType === "Expense" ? "Debit" : "Credit"}{" "}
            </h6>
            <h6
              className={
                props.transactionType === "Expense"
                  ? "text-danger"
                  : "text-primary"
              }
            >{`${props.currency} ${props.amount.toFixed(2)}`}</h6>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TransactionItem;
