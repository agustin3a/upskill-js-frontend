import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Spinner, Row, Col } from "react-bootstrap";
import LoadingAPICall from "../Loading/LoadingAPICall";
import AlertSuccess from "../Alert/AlertSuccess";
import TransactionDetails from "./TransactionDetails";
import * as transactionActionCreators from "../../state/actions/transactionActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as _ from "lodash";

function TransactionDelete({ transactionId }) {
  const dispatch = useDispatch();

  const [deleteTransactionInProgress, setDeleteTransactionInProgress] =
    useState(false);

  // States
  const transactionState = useSelector((state) => state.transaction);

  // Actions
  const { resetAPIFlags, getTransaction, deleteTransaction } =
    bindActionCreators(transactionActionCreators, dispatch);

  // Data
  const { currentTransaction } = transactionState;

  useEffect(() => {
    resetAPIFlags();
    getTransaction(transactionId);
  }, []);

  const handleDeleteTransaction = () => {
    let values = _.pick(currentTransaction, [
      "expense",
      "recipient",
      "transaction_date",
      "category_id",
      "amount",
    ]);
    values.transaction_date = new Date(values.transaction_date)
      .toISOString()
      .substring(0, 10);
    setDeleteTransactionInProgress(true);
    deleteTransaction(transactionId, values);
  };

  return (
    <>
      {transactionState.apiCallError && (
        <Alert variant="danger"> {transactionState.apiCallErrorMessage} </Alert>
      )}
      <Card>
        <Card.Header>
          <h4>Delete transaction</h4>
        </Card.Header>
        <Card.Body>
          {transactionState.apiCallInProgress &&
            deleteTransactionInProgress && <LoadingAPICall />}
          {transactionState.apiCallInProgress && !deleteTransactionInProgress && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
          {transactionState.apiCallCompleted && (
            <>
              {deleteTransactionInProgress && (
                <AlertSuccess title="Transaction deleted" />
              )}
              <TransactionDetails transaction={currentTransaction} />
              {!deleteTransactionInProgress && (
                <Row>
                  <Col>
                    <Button variant="danger" onClick={handleDeleteTransaction}>
                      {" "}
                      Delete transaction{" "}
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default TransactionDelete;
