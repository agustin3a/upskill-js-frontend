import React, { useEffect } from "react";
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
import LoadingAPICall from "../Loading/LoadingAPICall";
import TransactionDetails from "./TransactionDetails";
import AlertSuccess from "../Alert/AlertSuccess";
import MissingAccountMessage from "../Account/MissingAccountMessage";
import * as accountActionsCreators from "../../state/actions/accountActions";
import * as categoryActionCreators from "../../state/actions/categoryActions";
import * as transactionActionCreators from "../../state/actions/transactionActions";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";

function TransactionForm() {
  const dispatch = useDispatch();

  // States
  const accountState = useSelector((state) => state.account);
  const transactionState = useSelector((state) => state.transaction);
  const categoryState = useSelector((state) => state.category);

  // Actions
  const { resetAPIFlags, createTransaction } = bindActionCreators(
    transactionActionCreators,
    dispatch
  );
  const { getAccounts } = bindActionCreators(accountActionsCreators, dispatch);
  const { getCategories } = bindActionCreators(
    categoryActionCreators,
    dispatch
  );

  // Data
  const { accounts } = accountState;
  const { categories } = categoryState;
  const { currentTransaction } = transactionState;

  useEffect(() => {
    resetAPIFlags();
    getAccounts();
    getCategories();
  }, []);

  const schema = Yup.object().shape({
    recipient: Yup.string().required(),
    transaction_date: Yup.date().required(),
    amount: Yup.number().required().min(0.01),
  });

  const handleOnSubmit = async (values) => {
    values.currency_id = accounts.filter(
      (account) => account.id == values.account_id
    )[0].Currency.id;
    console.log(values);
    createTransaction(values);
  };

  return (
    <>
      {transactionState.apiCallError && (
        <Alert variant="danger"> {transactionState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Add transaction</h4>
        </Card.Header>
        <Card.Body>
          {transactionState.apiCallInProgress && <LoadingAPICall />}
          {transactionState.apiCallCompleted && (
            <>
              <AlertSuccess title="Transaction added" />
              <hr />
              <TransactionDetails
                transaction={currentTransaction}
                showActions={true}
              />
            </>
          )}

          {(accountState.apiCallError || categoryState.apiCallError) && (
            <AlertAPIError />
          )}
          {(accountState.apiCallInProgress ||
            categoryState.apiCallInProgress) && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
           {accountState.apiCallCompleted &&
            accounts.length <= 0 && (
              <MissingAccountMessage />
            )}
          {accountState.apiCallCompleted &&
            accounts.length > 0 &&
            categoryState.apiCallCompleted &&
            !(
              transactionState.apiCallInProgress ||
              transactionState.apiCallCompleted
            ) && (
              <Formik
                validationSchema={schema}
                onSubmit={handleOnSubmit}
                initialValues={{
                  recipient: "",
                  transaction_date: new Date().toISOString().substring(0, 10),
                  amount: 0,
                  account_id:
                    accounts && accounts.length > 0
                      ? accounts.filter((account) => account.active)[0].id
                      : 0,
                  category_id: categories[0].id,
                  expense: true,
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
                      <FloatingLabel label="Account">
                        <Form.Select
                          value={values.account_id}
                          name="account_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.account_id && !errors.account_id}
                          isInvalid={touched.account_id && errors.account_id}
                          disabled={isSubmitting}
                        >
                          {accounts
                            .filter((account) => account.active)
                            .map((account) => (
                              <option value={account.id} key={account.id}>
                                {`${account.Currency.code} - ${account.number}/${account.holder}`}
                              </option>
                            ))}
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.account_id}
                      </Form.Control.Feedback>
                    </Form.Floating>
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
                        "Add transaction"
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

export default TransactionForm;
