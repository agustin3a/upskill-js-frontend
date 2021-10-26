import React, { useEffect, useState } from "react";
import {
  Alert,
  Form,
  Button,
  Card,
  Spinner,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import AlertAPIError from "../Alert/AlertAPIError";
import AlertSuccess from "../Alert/AlertSuccess";
import LoadingAPICall from "../Loading/LoadingAPICall";
import TransactionDetails from "./TransactionDetails";
import * as categoryActionCreators from "../../state/actions/categoryActions";
import * as transactionActionCreators from "../../state/actions/transactionActions";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";

function TransactionEditForm({ transactionId }) {
  const dispatch = useDispatch();
  // Control variables
  const [updateTransactionInProgress, setUpdateTransactionInProgress] =
    useState(false);

  // States
  const transactionState = useSelector((state) => state.transaction);
  const categoryState = useSelector((state) => state.category);

  // Actions
  const { resetAPIFlags, updateTransaction, getTransaction } =
    bindActionCreators(transactionActionCreators, dispatch);
  const { getCategories } = bindActionCreators(
    categoryActionCreators,
    dispatch
  );

  // Data
  const { categories } = categoryState;
  const { currentTransaction } = transactionState;

  useEffect(() => {
    resetAPIFlags();
    getTransaction(transactionId);
    getCategories();
  }, []);

  const schema = Yup.object().shape({
    recipient: Yup.string().required(),
    transaction_date: Yup.date().required(),
    amount: Yup.number().required().min(0.01),
  });

  const handleOnSubmit = async (values) => {
    updateTransaction(transactionId, values);
    setUpdateTransactionInProgress(true);
  };

  return (
    <>
      {transactionState.apiCallError && (
        <Alert variant="danger"> {transactionState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Edit transaction</h4>
        </Card.Header>
        <Card.Body>
          {transactionState.apiCallInProgress &&
            updateTransactionInProgress && <LoadingAPICall />}
          {transactionState.apiCallCompleted && updateTransactionInProgress && (
            <>
              <AlertSuccess title="Transaction updated" />
              <hr />
              <TransactionDetails
                transaction={currentTransaction}
                showActions={true}
              />
            </>
          )}

          {(transactionState.apiCallError || categoryState.apiCallError) &&
            !updateTransactionInProgress && <AlertAPIError />}
          {(transactionState.apiCallInProgress ||
            categoryState.apiCallInProgress) &&
            !updateTransactionInProgress && (
              <Row>
                <Col className="d-flex justify-content-center">
                  <Spinner animation="grow" variant="dark" />
                </Col>
              </Row>
            )}
          {transactionState.apiCallCompleted &&
            categoryState.apiCallCompleted &&
            !updateTransactionInProgress && (
              <Formik
                validationSchema={schema}
                onSubmit={handleOnSubmit}
                initialValues={{
                  recipient: currentTransaction.recipient,
                  transaction_date: currentTransaction.transaction_date
                    ? new Date(currentTransaction.transaction_date)
                        .toISOString()
                        .substring(0, 10)
                    : new Date().toISOString().substring(0, 10),
                  amount: currentTransaction.amount,
                  category_id: currentTransaction.category_id,
                  expense: currentTransaction.expense,
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
                      <FloatingLabel label="Transaction Type">
                        <Form.Select
                          value={values.expense}
                          name="expense"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.expense && !errors.expense}
                          isInvalid={touched.expense && errors.expense}
                          disabled={isSubmitting}
                        >
                          <option value={true}>Expense</option>
                          <option value={false}>Income</option>
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.expense}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="text"
                        name="recipient"
                        value={values.recipient}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.recipient && !errors.recipient}
                        isInvalid={touched.recipient && errors.recipient}
                        disabled={isSubmitting}
                      />
                      <label htmlFor="recipient">Recipient/Sender</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.recipient}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="date"
                        name="transaction_date"
                        value={values.transaction_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.transaction_date && !errors.transaction_date
                        }
                        isInvalid={
                          touched.transaction_date && errors.transaction_date
                        }
                        disabled={isSubmitting}
                      />
                      <label htmlFor="transaction_date">Transaction date</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.transaction_date}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <FloatingLabel label="Category">
                        <Form.Select
                          value={values.category_id}
                          name="category_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.category_id && !errors.category_id}
                          isInvalid={touched.category_id && errors.category_id}
                          disabled={isSubmitting}
                        >
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.description}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.category_id}
                      </Form.Control.Feedback>
                    </Form.Floating>
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

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Edit transaction"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
        </Card.Body>
      </Card>
    </>
  );
}

export default TransactionEditForm;
