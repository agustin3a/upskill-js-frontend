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
import * as accountTypeActionCreators from "../../state/actions/accountTypeActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import * as Yup from "yup";

function BankAccountEditForm({ accountId }) {
  const dispatch = useDispatch();

  // Control variables
  const [updateAccountInProgress, setUpdateAccountInProgress] = useState(false);

  // States
  const accountTypeState = useSelector((state) => state.accountType);
  const accountState = useSelector((state) => state.account);

  // Actions
  const { getAccountTypes } = bindActionCreators(
    accountTypeActionCreators,
    dispatch
  );
  const { getAccount, updateAccount, resetAPIFlags } = bindActionCreators(
    accountActionsCreators,
    dispatch
  );

  // Data
  const accountTypes = useSelector((state) => state.accountType.accountTypes);
  const currentAccount = useSelector((state) => state.account.currentAccount);

  useEffect(() => {
    resetAPIFlags();
    getAccountTypes();
    getAccount(accountId);
  }, []);

  const schema = Yup.object().shape({
    holder: Yup.string().required(),
    number: Yup.string().required(),
    bank: Yup.string().required(),
  });

  const handleOnSubmit = async (values) => {
    updateAccount(accountId,values);
    setUpdateAccountInProgress(true);
  };

  return (
    <>
      {accountState.apiCallError && (
        <Alert variant="danger"> {accountState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Edit bank account</h4>
        </Card.Header>
        <Card.Body>
          {accountState.apiCallInProgress && updateAccountInProgress && (
            <LoadingAPICall />
          )}
          {accountState.apiCallCompleted && updateAccountInProgress && (
            <AccountDetails account={currentAccount} title="Account updated" />
          )}

          {accountTypeState.apiCallError && <AlertAPIError />}
          {accountTypeState.apiCallInProgress && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
          {accountTypeState.apiCallCompleted &&
            accountState.apiCallCompleted &&
            !updateAccountInProgress && (
              <Formik
                validationSchema={schema}
                onSubmit={handleOnSubmit}
                initialValues={{
                  holder: currentAccount.holder,
                  number: currentAccount.number,
                  bank: currentAccount.bank,
                  account_type_id: currentAccount.AccountType.id,
                  active: currentAccount.active,
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
                      <FloatingLabel label="Status">
                        <Form.Select
                          value={values.active}
                          name="active"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.active && !errors.active}
                          isInvalid={touched.active && errors.active}
                          disabled={isSubmitting}
                        >
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </Form.Select>
                      </FloatingLabel>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.active}
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
                        "Edit account"
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

export default BankAccountEditForm;
