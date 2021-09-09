import React from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function LoginForm() {
  const schema = Yup.object().shape({
    email: Yup.string().required().email("email entered is invalid"),
    password: Yup.string().required(),
  });

  return (
    <>
      <Card>
        <Card.Header>
          <h4>Log in</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              email: "",
              password: "",
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
                  <label htmlFor="eamil">Email address</label>
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
                </Form.Floating>
                <Button variant="primary" type="submit">
                  Login
                </Button>

              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginForm;
