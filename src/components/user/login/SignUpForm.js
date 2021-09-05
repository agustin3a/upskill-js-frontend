import React from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";

function SignUpForm() {
  return (
    <>
      <Card>
      <Card.Header><h3>Create an account</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SignUpForm;
