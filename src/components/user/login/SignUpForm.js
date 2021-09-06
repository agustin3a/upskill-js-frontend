import React from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

function SignUpForm() {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required(),
  });

  return (
    <>
      <Card>
        <Card.Header>
          <h4>Create an account</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-32 characters long, contain letters,
                    numbers and at least one special character.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create account
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}

export default SignUpForm;
