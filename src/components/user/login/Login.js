import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { gsap } from "gsap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login() {
  const boxRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    gsap.to(boxRef.current, {
      rotation: "+=360",
      repeat: -1,
      repeatDelay: 4,
      yoyo: false,
    });
  });

  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <h1> Welcome to Budge App</h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Image src="/logo192.png" className="box" ref={boxRef} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm />
          </Col>
          <Col>
            <SignUpForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
