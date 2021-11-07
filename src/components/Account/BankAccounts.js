import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Table, Button, Card, Col, Spinner } from "react-bootstrap";
import AlertAPIError from "../Alert/AlertAPIError";
import MissingAccountMessage from "./MissingAccountMessage";
import * as accountActionsCreators from "../../state/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { FaRegEdit } from "react-icons/fa";

function BankAccounts(props) {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.account);
  const { getAccounts } = bindActionCreators(accountActionsCreators, dispatch);
  const accounts = useSelector((state) => state.account.accounts);

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title> {props.title} </Card.Title>
        </Card.Header>
        <Card.Body>
          {accountState.apiCallError && <AlertAPIError />}
          {accountState.apiCallInProgress && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
          {accountState.apiCallCompleted && accounts.length === 0 && (
            <MissingAccountMessage />
          )}
          {accountState.apiCallCompleted && accounts.length > 0 && (
            <Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Bank</th>
                    <th>Number</th>
                    <th>Type </th>
                    <th>Currency</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td className="align-middle">{account.holder}</td>
                      <td className="align-middle">{account.bank}</td>
                      <td className="align-middle">{account.number}</td>
                      <td className="align-middle">
                        {account.AccountType.description}
                      </td>
                      <td className="align-middle">{account.Currency.code}</td>
                      <td className="align-middle"> {account.balance}</td>
                      <td className="align-middle">
                        {" "}
                        <strong className={account.active ? "text-success" : "text-danger"}>
                        {account.active ? "Active" : "Inactive"}{" "}
                        </strong>
                      </td>
                      <td>
                        <Link to={"/account/edit/" + account.id}>
                          <Button className="m-1">
                            <FaRegEdit /> Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default BankAccounts;
