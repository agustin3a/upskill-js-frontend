import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function AccountLayout(props) {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="display-5">Bank accounts</h1>
        </Col>
        {props.showActions &&
        (
          <Col className="d-flex justify-content-end align-items-end">
            <Link to="account/add">
              <Button className="m-1">
                <FaPlus /> Add bank account
              </Button>
            </Link>
          </Col>
        )}
      </Row>
      <hr />
      <Row>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

export default AccountLayout;
