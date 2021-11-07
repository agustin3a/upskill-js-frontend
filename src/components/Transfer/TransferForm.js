import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Form,
  Button,
  Card,
  Spinner,
  FloatingLabel,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { Formik } from "formik";
import * as accountActionsCreators from "../../state/actions/accountActions";
import * as transferActionsCreators from "../../state/actions/transferActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { FaCheckCircle, FaPlus, FaListUl } from "react-icons/fa";
import MissingAccountMessage from "../Account/MissingAccountMessage";
import { Link } from "react-router-dom";

function TransferForm(props) {
  const [transferSubmitted, setTransferSubmitted] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  // States
  const accountState = useSelector((state) => state.account);
  const transferState = useSelector((state) => state.transfer);

  // Actions
  const { getAccounts } = bindActionCreators(accountActionsCreators, dispatch);
  const { validateTransfer, resetAPIFlags, createTransfer } =
    bindActionCreators(transferActionsCreators, dispatch);

  // Data
  const { accounts } = accountState;
  const { transferValidate } = transferState;

  useEffect(() => {
    resetAPIFlags();
    getAccounts();
  }, []);

  const schema = Yup.object().shape({
    sender_amount: Yup.number()
      .required("Amount is a required field")
      .min(0.01),
    recipient_email: Yup.string()
      .required("Recipient's email is a required field")
      .email("Enter a valid email"),
    recipient_account_number: Yup.string().required(
      "Recipient's account number is a required field"
    ),
  });

  const handleOnSubmit = async (values) => {
    setShowConfirmationModal(true);
    validateTransfer(values);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOnConfirmationSubmit = async () => {
    console.log(formRef.current.values);
    setTransferSubmitted(true);
    setShowConfirmationModal(false);
    createTransfer(formRef.current.values);
  };

  return (
    <>
      {transferState.apiCallError && (
        <Alert variant="danger"> {transferState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>{props.title}</h4>
        </Card.Header>
        <Card.Body>
          {!transferSubmitted &&
            accountState.apiCallCompleted &&
            accounts.length > 0 && (
              <Formik
                innerRef={formRef}
                validationSchema={schema}
                onSubmit={handleOnSubmit}
                initialValues={{
                  sender_amount: 0.01,
                  recipient_email: "",
                  recipient_account_number: "",
                  sender_account_id:
                    accounts && accounts.length > 0
                      ? accounts.filter((account) => account.active)[0].id
                      : 0,
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
                          value={values.sender_account_id}
                          name="sender_account_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.sender_account_id &&
                            !errors.sender_account_id
                          }
                          isInvalid={
                            touched.sender_account_id &&
                            errors.sender_account_id
                          }
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
                        {errors.sender_account_id}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="number"
                        name="sender_amount"
                        value={values.sender_amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.sender_amount && !errors.sender_amount}
                        isInvalid={
                          touched.sender_amount && errors.sender_amount
                        }
                        placeholder="Amount"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="sender_amount">Amount</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.sender_amount}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <hr />
                    <h5> Recipient information </h5>
                    <h6 className="text-muted">
                      The email and number account must be registered in Budget.
                    </h6>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="email"
                        name="recipient_email"
                        value={values.recipient_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.recipient_email && !errors.recipient_email
                        }
                        isInvalid={
                          touched.recipient_email && errors.recipient_email
                        }
                        disabled={isSubmitting}
                      />
                      <label htmlFor="recipient_email">Recipient's email</label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.recipient_email}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        type="text"
                        name="recipient_account_number"
                        value={values.recipient_account_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.recipient_account_number &&
                          !errors.recipient_account_number
                        }
                        isInvalid={
                          touched.recipient_account_number &&
                          errors.recipient_account_number
                        }
                        disabled={isSubmitting}
                      />
                      <label htmlFor="recipient_account_number">
                        Recipient's account number
                      </label>
                      <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.recipient_account_number}
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
                        "Complete transfer"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}

          {!transferSubmitted &&
            accountState.apiCallCompleted &&
            accounts.length <= 0 && <MissingAccountMessage />}

          {transferSubmitted && transferState.apiCallCompleted && (
            <>
              <Row>
                <Col className="d-flex justify-content-center">
                  <h3> Transfer complete </h3>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <FaCheckCircle size="5em" color="green" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col className="d-flex justify-content-center my-2">
                  <Button
                    className="mx-1"
                    onClick={() => {
                      setTransferSubmitted(false);
                    }}
                  >
                    <FaPlus /> Make another transfer
                  </Button>
                  <Link to="/transactions">
                    <Button className="mx-1">
                      <FaListUl /> Check your transactions
                    </Button>
                  </Link>
                </Col>
              </Row>
            </>
          )}

          {transferSubmitted && transferState.apiCallInProgress && (
            <>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Spinner animation="border" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="d-flex justify-content-center">
                    {" "}
                    Your transfer is beign processed{" "}
                  </h3>
                  <h5 className="d-flex justify-content-center text-muted">
                    {" "}
                    Please don't close this window until the process is finished
                  </h5>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={transferState.apiCallCompleted && showConfirmationModal}
        onHide={handleCloseConfirmationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold mb-1"> Debit from:</p>
          <p>
            {transferValidate.sender_account
              ? `${transferValidate.sender_account.Currency.code} - ${transferValidate.sender_account.number} / ${transferValidate.sender_account.holder}`
              : ""}
          </p>
          <p className="fw-bold mb-1"> Destination account:</p>
          <p>
            {transferValidate.recipient_account
              ? `${transferValidate.recipient_account.Currency.code} - ${transferValidate.recipient_account.number} / ${transferValidate.recipient_account.holder}`
              : ""}
          </p>

          <p className="fw-bold  mb-1"> Debit amount: </p>
          <p>
            {transferValidate.sender_account
              ? `${transferValidate.sender_account.Currency.code} ${transferValidate.sender_amount}`
              : ""}
          </p>
          <p className="fw-bold  mb-1"> Credit amount: </p>
          <p>
            {transferValidate.recipient_account &&
            transferValidate.sender_account
              ? `${transferValidate.recipient_account.Currency.code} ${transferValidate.recipient_amount}`
              : ""}
          </p>
          {transferValidate.exchangeRateApplied && (
            <>
              <p className="fw-bold  mb-1"> Exchange rate: </p>
              <p>{transferValidate.exchangeRate}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOnConfirmationSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TransferForm;
