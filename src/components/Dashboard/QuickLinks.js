import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FaPiggyBank, FaHandHoldingUsd, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "moment";

function QuickLinks() {
  const iconsSize = "1em";
  const userFullName = "Carlos";

  return (
    <>
      <div className="bg-light text-dark p-3 mb-3 card">
        <h3 className="display-6"> Hello, {userFullName} </h3>
        <h5 className="text-muted"> { Moment().format('dddd, MMMM Do')} </h5>
        <hr />
        <Row>
          <Col className="d-flex justify-content-center">
            <h6 className="text-muted">Quick links</h6>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Link to="account/add">
              <Button className="mx-1">
                {" "}
                <FaPiggyBank size={iconsSize} /> Add bank account
              </Button>
            </Link>
            <Link to="transaction/add">
              <Button className="mx-1">
                {" "}
                <FaPlus size={iconsSize} /> Add expense/income{" "}
              </Button>
            </Link>
            <Link to="transfer/add">
              <Button className="mx-1">
                {" "}
                <FaHandHoldingUsd size={iconsSize} /> Make a transfer{" "}
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default QuickLinks;
