import React from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { IPhone7, Macbook } from "react-device-mockups";
import "html5-device-mockups/dist/device-mockups.min.css";

function DeviceMockup() {
  return (
    <>
      <div className="bg-ligth text-dark my-5">
        <Container>
          <Row className="my-3">
            <Col className="text-center">
              <h1 class="display-5"> Designed for all kind of devices </h1>
              <h5 className="text-muted">
                Budget is optimized to be used across all your devices: laptops, tablets and smartphones
              </h5>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Macbook height={400} orientation="landscape" color="black">
                <Image src="/welcome_budget_image.png" fluid />
              </Macbook>
              <IPhone7 height={400} orientation="portrait" color="black">
                <Image src="/welcome_budget_image.png" fluid />
              </IPhone7>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DeviceMockup;
