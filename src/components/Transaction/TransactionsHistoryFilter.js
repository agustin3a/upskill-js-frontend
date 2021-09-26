import React from "react";
import { Form, Card, Col, Row } from "react-bootstrap";
import Select from "react-select";

function TransactionsHistoryFilter(props) {
  const displayCategories = props.categories.map((category) => {
    return { value: category, label: category };
  });

  const displayBankAccounts = props.bankAccounts.map((bankAccount) => {
    return { value: bankAccount, label: bankAccount };
  });

  const onChangeCategoryFilter = (categoriesSelected) => {
    props.updateCategoriesFilter(categoriesSelected);
  };

  const onChangeBankAccountFilter = (bankAccountsSelected) => {
    props.updateBankAccountsFilter(bankAccountsSelected);
  };

  return (
    <Card>
      <Card.Header>Filter</Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formAccountsFilter">
                <Form.Label>Bank Accounts</Form.Label>
                <Select
                  name="bankAccounts"
                  options={displayBankAccounts}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChangeBankAccountFilter}
                  isMulti
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCategoriesFilter">
                <Form.Label>Categories</Form.Label>
                <Select
                  name="categories"
                  options={displayCategories}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChangeCategoryFilter}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TransactionsHistoryFilter;
