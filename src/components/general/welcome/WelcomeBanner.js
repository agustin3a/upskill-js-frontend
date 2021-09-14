import React from "react";
import welcomeBudgeImage from "./welcome_budget_image.png";
import { Link } from "react-router-dom";
import { Image, Col, Row, Container, Button } from "react-bootstrap";

function WelcomeBanner() {
  return (
    <>
      <div>
        <Container>
          <Row className="d-flex align-items-center">
            <Col>
              <h1 className="display-3"> Welcome to Budget</h1>
              <h5 className="text-muted pb-4">
                Organize your budget and transfer money between other users and
                stores safe and easy
              </h5>
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Create an account
                </Button>
              </Link>{" "}
              <Link to="login">
                <Button variant="outline-primary" size="lg">
                  Log in
                </Button>
              </Link>
            </Col>
            <Col className="">
              <Image src={welcomeBudgeImage} fluid />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WelcomeBanner;
