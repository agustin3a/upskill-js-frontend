import React from "react";
import { Alert, Row } from "react-bootstrap";

function AlertAPIError() {
  return (
    <Row>
      <Alert variant="danger">
        <Alert.Heading className="d-flex justify-content-center">
          Something went wrong on our end! :(
        </Alert.Heading>
        <p className="d-flex justify-content-center">
          Some services are unavailabe righ now, please try again later.
        </p>
      </Alert>
    </Row>
  );
}

export default AlertAPIError;
