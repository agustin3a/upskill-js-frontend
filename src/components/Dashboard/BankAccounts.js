import React from "react";
import { Row, Col, Table, Button, Card } from "react-bootstrap";

function BankAccounts(props) {
  return (
    <>
    <Card>
      <Card.Header>
        <Card.Title> Bank accounts </Card.Title>
        </Card.Header>
      <Card.Body>
      <Row>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.bankAccounts.map((bankAccount, index) => (
              <tr key={bankAccount}>
                <td>Carlos Aguilar</td>
                <td>{bankAccount}</td>
                <td>USD 1500.00</td>
                <td>
                  <Button>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      </Card.Body>
      </Card>
    </>
  );
}

export default BankAccounts;
