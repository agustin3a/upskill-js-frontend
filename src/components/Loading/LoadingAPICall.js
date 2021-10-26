import React from "react";
import { Row, Col, Spinner } from 'react-bootstrap';

function LoadingAPICall() {
  return (
    <section>
      <Row>
        <Col className="d-flex justify-content-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="d-flex justify-content-center">
            {" "}
            Your transaction is beign processed{" "}
          </h3>
          <h5 className="d-flex justify-content-center text-muted">
            {" "}
            Please don't close this window until the process is finished
          </h5>
        </Col>
      </Row>
    </section>
  );
}

export default LoadingAPICall;
