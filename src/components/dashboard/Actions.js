import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { FaPiggyBank, FaHandHoldingUsd, FaPlus } from "react-icons/fa";

function Actions() {
  const iconsSize = "1em";
  const userFullName = "Carlos";

  return (
    <>
      <div className="bg-light text-dark p-3 mb-3">
        <h3 className="display-6"> Hello, {userFullName} </h3>
        <hr/>
        <Row>
            <Col className="d-flex justify-content-center"><h6 className="text-muted">Quick links</h6></Col>
          </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button className="mx-1">
              {" "}
              <FaPiggyBank size={iconsSize} /> Add bank account
            </Button>

            <Button className="mx-1">
              {" "}
              <FaPlus size={iconsSize} /> Add expense/income{" "}
            </Button>

            <Button className="mx-1">
              {" "}
              <FaHandHoldingUsd size={iconsSize} /> Make a transfer{" "}
            </Button>
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default Actions;
