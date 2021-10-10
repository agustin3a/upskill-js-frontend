import React from "react";
import { Row, Table, Button, Card } from "react-bootstrap";

function BankAccounts(props) {
  return (
    <>
    <Card className="mb-3">
      <Card.Header>
        <Card.Title> {props.title} </Card.Title>
        </Card.Header>
      <Card.Body>
      <Row>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Balance</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.bankAccounts.map((bankAccount, index) => (
              <tr key={bankAccount}>
                <td className="align-middle">Carlos Aguilar</td>
                <td className="align-middle">{bankAccount}</td>
                <td className="align-middle">USD 1500.00</td>
                <td className="align-middle"> Active </td>
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
