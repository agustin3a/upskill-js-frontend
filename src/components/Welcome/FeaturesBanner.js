import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FaMoneyBillAlt, FaListAlt, FaHandHoldingUsd } from "react-icons/fa";

function FeaturesBanner() {
  return (
    <>
      <div className="p-4 mt-4 bg-dark text-light">
        <Container>
          <Row className="">
            <Col className="">
              <Row>
                <FaListAlt size="5em" />
              </Row>
              <Row className="text-center">
                <h4>Organize your budget </h4>
                <h6 className="text-muted">
                  {" "}
                  Add expenses/income with a complete list of categories and
                  keep your budget organized
                </h6>
              </Row>
            </Col>
            <Col>
              <Row>
                <FaMoneyBillAlt size="5em" />
              </Row>
              <Row className="text-center"> 
                <h4> Add your bank accounts </h4>
                <h6 className="text-muted">
                  {" "}
                  Update your budget automatically linking your bank accounts 
                </h6>
              </Row>
            </Col>
            <Col>
              <Row>
                <FaHandHoldingUsd size="5em" />
              </Row>
              <Row className="text-center">
                <h4> Money transfers</h4>
                <h6 className="text-muted">
                  {" "}
                  Send money to stores or users directly from Budget 
                </h6>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default FeaturesBanner;
