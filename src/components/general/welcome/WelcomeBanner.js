import React from "react";
import welcomeBudgeImage from './welcome_budget_image.png';
import { Image, Col, Row, Container, Button } from "react-bootstrap";

function WelcomeBanner() {
  return (
    <>
      <div>
        <Container>
          <Row className="d-flex align-items-center">
            <Col>
              <h1 class="display-3"> Welcome to Budget</h1>
              <h5 className="text-muted pb-4">
                Organize your budget and transfer money between other users and
                stores safe and easy
              </h5>
              <Button variant="primary" size="lg">
                Create an account
              </Button>{" "}
              <Button variant="outline-primary" size="lg">
                Login
              </Button>
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
