import React, { useState } from "react";
import { Alert, Form, Button, Card, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

function LoginForm() {
  const firebase = useFirebase();
  const [onSubmitError, setOnSubmitError] = useState(false);
  const history = useHistory();
  const auth = useSelector((state) => state.firebase);

  const schema = Yup.object().shape({
    email: Yup.string().required().email("email entered is invalid"),
    password: Yup.string().required(),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      setOnSubmitError(false);
      await firebase.login({ email: values.email, password: values.password });
      history.push("/dashboard");
    } catch (error) {
      setOnSubmitError(true);
    }
  };

  return (
    <>
      {(auth.authError && onSubmitError) && (
        <Alert variant="danger"> {auth.authError.message} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Log in</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleOnSubmit}
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
              isSubmitting,
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  <label htmlFor="password">Password</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer>
          Don't have an account?{" "}
          <Link to="register"> Create a Budget account </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

export default LoginForm;
