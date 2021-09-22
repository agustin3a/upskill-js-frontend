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

function TransactionForm(props) {
  const [onSubmitError, setOnSubmitError] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const schema = Yup.object().shape({
    date: Yup.date().required(),
    amount: Yup.number().required().positive(),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    console.log(values);
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
          <h4>{props.title}</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleOnSubmit}
            initialValues={{
              amount: "",
              note: "",
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
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.amount && !errors.amount}
                    isInvalid={touched.amount && errors.amount}
                    placeholder="Enter account's amount"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="amount">Amount</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.amount}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.date && !errors.date}
                    isInvalid={touched.date && errors.date}
                    placeholder="Enter account's date"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="date">Date</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <FloatingLabel label="Category">
                    <Form.Select
                      value={values.category}
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.category && !errors.category}
                      isInvalid={touched.category && errors.category}
                      disabled={isSubmitting}
                    >
                      <option value="checking">Transfer</option>
                      <option value="savings">Deposit </option>
                      <option value="moneyMarket">Groceries</option>
                      <option value="certificate">Medicine</option>
                    </Form.Select>
                  </FloatingLabel>
                  <Form.Control.Feedback category="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback category="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    name="note"
                    as="textarea"
                    style={{ height: "100px" }}
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.note && !errors.note}
                    isInvalid={touched.note && errors.note}
                    placeholder="Enter account's note"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="note">Note</label>
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.note}
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
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
}

export default TransactionForm;
