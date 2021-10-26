import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from 'moment';
import {
  FaShoppingBag,
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
  const getCategoryIcon = (categoryDescription) => {
    let size = "2em";
    let categoryIcon = <FaMoneyBillAlt size={size} />;
    switch (categoryDescription) {
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
      default:
        categoryIcon = <FaHandHoldingUsd size={size} />;
        break;
    }
    return categoryIcon;
  };

  return (
    <Card className="mb-3" border={props.expense ? "danger" : "primary"}>
      <Card.Header
        className={props.expense ? "bg-danger py-1" : "bg-primary py-1"}
      ></Card.Header>
      <Card.Body className="py-1">
        <Row>
          <Col>
            <Row>
              <Col md="auto" className="d-flex align-items-center">
                {getCategoryIcon(props.Category.description)}
              </Col>
              <Col className="text-start">
                <span className="fs-5"> {props.recipient} </span> <br />
                <span className="fst-italic fw-bold"> Category: </span>{" "}
                <span className="fw-normal">
                  {" "}
                  {props.Category.description}{" "}
                </span>{" "}
                <br />
                <span className="fst-italic fw-bold"> Bank account: </span>{" "}
                <span className="fw-normal"> {`${props.Account.number} / ${props.Account.holder}`} </span>{" "}
                <br />
                <span className="fst-italic fw-bold"> Date: </span>{" "}
                <span className="fw-normal"> {Moment(props.transaction_date).format('LL')} </span>{" "}
                <br />
                <Link to={`/transaction/edit/${props.id}`}>Edit</Link> /{" "}
                <Link to={`/transaction/delete/${props.id}`}>Delete</Link>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-end flex-column align-items-end">
            <h6 className={props.expense ? "text-danger" : "text-primary"}>
              {props.expense ? "Expense" : "Income"} {" / "}
              {props.expense ? "Debit" : "Credit"}{" "}
            </h6>
            <h6 className={props.expense ? "text-danger" : "text-primary"}>{`${
              props.Currency.code
            } ${props.amount.toFixed(2)}`}</h6>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TransactionItem;
