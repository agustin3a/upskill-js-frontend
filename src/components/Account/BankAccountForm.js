import React, { useState } from "react";
import {
  Alert,
  Form,
  Button,
  Card,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function BankAccountForm() {
  const [onSubmitError, setOnSubmitError] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    number: Yup.string().required(),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    setOnSubmitError(false);
    await sleep(2000);
    alert(`values: ${JSON.stringify(values)}`);
  };

  return (
    <>
      {onSubmitError && (
        <Alert variant="danger"> {onSubmitError.message} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Add bank account</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleOnSubmit}
            initialValues={{
              name: "",
              number: "",
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                    placeholder="Enter account's name"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="name">Name</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.number && !errors.number}
                    isInvalid={touched.number && errors.number}
                    placeholder="Enter account's number"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="number">Number</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <FloatingLabel label="Type">
                    <Form.Select
                      value={values.type}
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.type && !errors.type}
                      isInvalid={touched.type && errors.type}
                      disabled={isSubmitting}
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings </option>
                      <option value="moneyMarket">Money market</option>
                      <option value="certificate">
                        Certificate of deposit
                      </option>
                    </Form.Select>
                  </FloatingLabel>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.type}
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
                    "Add account"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}

export default BankAccountForm;
