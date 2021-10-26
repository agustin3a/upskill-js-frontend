import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

function AlertSuccess({title}) {
  return (
    <Row>
      <Col>
        <Alert variant="success">
          {" "}
          <FaCheckCircle size="2em" color="green" /> {title}
        </Alert>
      </Col>
    </Row>
  );
}

export default AlertSuccess;
