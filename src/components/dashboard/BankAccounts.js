import React from "react";
import { Row, Col, Table, Button, Accordion } from "react-bootstrap";

function BankAccounts(props) {
  return (
    <>
      <Accordion defaultActiveKey="0" className="my-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Bank accounts</Accordion.Header>
          <Accordion.Body>
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
                    <tr>
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
            <Row>
              <Col>
                <Button> Add bank account </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default BankAccounts;
