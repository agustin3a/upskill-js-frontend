import React, { useState, useEffect } from "react";
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
import AccountDetails from "./AccountDetails";
import * as accountActionsCreators from "../../state/actions/accountActions";
import * as currencyActionCreators from "../../state/actions/currencyActions";
import * as accountTypeActionCreators from "../../state/actions/accountTypeActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import * as Yup from "yup";

function BankAccountForm() {
  const dispatch = useDispatch();

  // States
  const currencyState = useSelector((state) => state.currency);
  const accountTypeState = useSelector((state) => state.accountType);
  const accountState = useSelector((state) => state.account);

  // Actions
  const { getCurrencies } = bindActionCreators(
    currencyActionCreators,
    dispatch
  );
  const { getAccountTypes } = bindActionCreators(
    accountTypeActionCreators,
    dispatch
  );
  const { createAccount, resetAPIFlags } = bindActionCreators(
    accountActionsCreators,
    dispatch
  );

  // Data
  const currencies = useSelector((state) => state.currency.currencies);
  const accountTypes = useSelector((state) => state.accountType.accountTypes);
  const currentAccount = useSelector((state) => state.account.currentAccount);

  useEffect(() => {
    resetAPIFlags();
    getCurrencies();
    getAccountTypes();
  }, []);

  const schema = Yup.object().shape({
    holder: Yup.string().required(),
    number: Yup.string().required(),
    bank: Yup.string().required(),
    balance: Yup.number().required().min(0),
  });

  const handleOnSubmit = async (values) => {
    createAccount(values);
  };

  return (
    <>
      {accountState.apiCallError && (
        <Alert variant="danger"> {accountState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Add bank account</h4>
        </Card.Header>
        <Card.Body>
          {accountState.apiCallInProgress && <LoadingAPICall />}
          {accountState.apiCallCompleted && (
            <AccountDetails account={currentAccount} title="Account added" />
          )}
         
          {(currencyState.apiCallError || accountTypeState.apiCallError) && (
            <AlertAPIError />
          )}
          {(currencyState.apiCallInProgress ||
            accountTypeState.apiCallInProgress) && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
          {currencyState.apiCallCompleted &&
            accountTypeState.apiCallCompleted &&
            !(
              accountState.apiCallInProgress || accountState.apiCallCompleted
            ) && (
              <Formik
                validationSchema={schema}
                onSubmit={handleOnSubmit}
                initialValues={{
                  holder: "",
                  number: "",
                  bank: "",
                  balance: 0,
                  account_type_id: accountTypes[0].id,
                  currency_id: currencies[0].id
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
                        name="holder"
                        value={values.holder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.holder && !errors.holder}
                        isInvalid={touched.holder && errors.holder}
                        placeholder="Enter account's holder"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="holder">Holder</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.holder}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="text"
                        name="bank"
                        value={values.bank}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.bank && !errors.bank}
                        isInvalid={touched.bank && errors.bank}
                        placeholder="Enter account's bank"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="bank">Bank</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.bank}
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
                      <Form.Control
                        type="number"
                        name="balance"
                        value={values.balance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.balance && !errors.balance}
                        isInvalid={touched.balance && errors.balance}
                        placeholder="Enter account's balance"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="balance">Balance</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.balance}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <FloatingLabel label="Type">
                        <Form.Select
                          value={values.account_type_id}
                          name="account_type_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.account_type_id && !errors.account_type_id
                          }
                          isInvalid={
                            touched.account_type_id && errors.account_type_id
                          }
                          disabled={isSubmitting}
                        >
                          {accountTypes.map((accountType) => (
                            <option value={accountType.id} key={accountType.id}>
                              {accountType.description}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.account_type_id}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <FloatingLabel label="Currency">
                        <Form.Select
                          value={values.currency_id}
                          name="currency_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.currency_id && !errors.currency_id}
                          isInvalid={touched.currency_id && errors.currency_id}
                          disabled={isSubmitting}
                        >
                          {currencies.map((currency) => (
                            <option value={currency.id} key={currency.id}>
                              {currency.code}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.currency_id}
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
                        "Add account"
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

export default BankAccountForm;
