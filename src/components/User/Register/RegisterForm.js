import React, { useState } from "react";
import { Alert, Spinner, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../../state/actions/userActions";
import * as Yup from "yup";

function RegisterForm() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase);
  const [onSubmitError, setOnSubmitError] = useState(false);
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { createUser } = bindActionCreators(userActionCreators, dispatch);

  const schema = Yup.object().shape({
    firstName: Yup.string().required("first name is a required field"),
    lastName: Yup.string().required("last name is a required field"),
    email: Yup.string().required().email("enter valid email"),
    password: Yup.string().required().min(8),
    confirmPassword: Yup.string()
      .required("confirm password is a required field")
      .oneOf([Yup.ref("password"), null], "passwords must match"),
  });

  const handleOnSubmit = async (values) => {
    try {
      setOnSubmitError(false);
      createUser(values, () => history.push("/dashboard"));
    } catch (error) {
      setOnSubmitError(true);
    }
  };

  return (
    <>
      {auth.authError && (
        <Alert variant="danger"> {auth.authError.message} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Create an account</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleOnSubmit}
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
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
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && errors.firstName}
                    placeholder="Enter first name"
                  />
                  <label htmlFor="firstName">First name</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && errors.lastName}
                    placeholder="Enter last name"
                  />
                  <label htmlFor="lastName">Last name</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Floating>
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
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    placeholder="Confirm password"
                  />
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button variant="primary" type="submit">
                  {isSubmitting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer>
          Do you already have an account? <Link to="login"> Log in </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

export default RegisterForm;
