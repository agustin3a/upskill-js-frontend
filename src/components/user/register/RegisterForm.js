import React from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function RegisterForm() {
  const schema = Yup.object().shape({
    email: Yup.string().required().email('email entered is invalid'),
    password: Yup.string().required().min(8),
    confirmPassword: Yup.string().required('confirm password is a required field').oneOf([Yup.ref('password'),null], 'passwords must match')
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
                <Form.Floating className="mb-3">
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
                  <label htmlFor="email">Email address</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
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
                  <label htmlFor="password">Password</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be at least 8 characters long.
                  </Form.Text>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                    placeholder="Confirm password"
                  />
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Floating>
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

export default RegisterForm;
