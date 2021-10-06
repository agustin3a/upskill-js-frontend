import React, { useState, useRef } from "react";
import {
  Alert,
  Form,
  Button,
  Card,
  Spinner,
  FloatingLabel,
  Modal,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaCheckCircle, FaPlus, FaListUl } from "react-icons/fa";
import { set } from "lodash";
import { Link } from "react-router-dom";

function TransferForm(props) {
  const [transferCompleted, setTransferCompleted] = useState(false);
  const [transferSubmitted, setTransferSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [onSubmitError, setOnSubmitError] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const formRef = useRef();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const schema = Yup.object().shape({
    amount: Yup.number().required().positive(),
    account: Yup.string().required().email(),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    // Verify that the account exists
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOnConfirmationSubmit = async () => {
    setShowForm(false);
    setShowConfirmationModal(false);
    setTransferSubmitted(true);
    setTransferCompleted(false);
    await sleep(4000);
    // Submit transactions
    setTransferCompleted(true);
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
          {showForm && (
            <Formik
              innerRef={formRef}
              validationSchema={schema}
              onSubmit={handleOnSubmit}
              initialValues={{
                amount: "",
                note: "",
                account: "",
                currency: "USD",
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
                    <FloatingLabel label="Currency">
                      <Form.Select
                        value={values.currency}
                        name="currency"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.currency && !errors.currency}
                        isInvalid={touched.currency && errors.currency}
                        disabled={isSubmitting}
                      >
                        <option value="USD">USD</option>
                        <option value="GTQ">GTQ </option>
                        <option value="EUR">EUR</option>
                      </Form.Select>
                    </FloatingLabel>
                    <Form.Control.Feedback currency="valid"></Form.Control.Feedback>
                    <Form.Control.Feedback currency="invalid">
                      {errors.currency}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="emai"
                      name="account"
                      value={values.account}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.account && !errors.account}
                      isInvalid={touched.account && errors.account}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="account">
                      Email account to transfer the money
                    </label>
                    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.account}
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

          {transferSubmitted && (
            <Container>
              {transferCompleted && (
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
                          setShowForm(true);
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
              {!transferCompleted && (
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
                        Please don't close this window until the process is
                        finished
                      </h5>
                    </Col>
                  </Row>
                </>
              )}
            </Container>
          )}
        </Card.Body>
      </Card>

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold mb-1"> Transfer to:</p>
          <p>
            {" "}
            Carlos Aguilar
            {formRef.current && ` <${formRef.current.values.account}>`}
          </p>
          <p className="fw-bold  mb-1"> Amount: </p>
          <p>
            {formRef.current &&
              ` ${formRef.current.values.currency} ${formRef.current.values.amount}`}
          </p>
          <p className="fw-bold  mb-1"> Notes: </p>
          <p> {formRef.current && ` ${formRef.current.values.note}`}</p>
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
