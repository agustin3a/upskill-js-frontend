import React, { useState } from "react";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Moment from "moment";
import { formatDate, parseDate } from "react-day-picker/moment";

function TransactionsHistoryFilter(props) {
  const [inputDateFrom, setInputDateFrom] = useState(Moment().startOf("month"));
  const [inputDateTo, setInputDateTo] = useState(Moment().endOf("month"));
  const [searchErrorMessage, setSearchErrorMessage] = useState();

  const displayCategories = props.categories.map((category) => {
    return { value: category, label: category };
  });

  const displayBankAccounts = props.bankAccounts.map((bankAccount) => {
    return { value: bankAccount, label: bankAccount };
  });

  const displayTransactionType = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  // Event handlers

  const onChangeCategoryFilter = (categoriesSelected) => {
    props.updateCategoriesFilter(categoriesSelected);
  };

  const onChangeBankAccountFilter = (bankAccountsSelected) => {
    props.updateBankAccountsFilter(bankAccountsSelected);
  };

  const updateInputDateFrom = (newDate) => {
    setInputDateFrom(newDate);
    setSearchErrorMessage();
  };

  const updateInputDateTo = (newDate) => {
    setInputDateTo(newDate);
    setSearchErrorMessage();
  };

  const onSearchSubmit = () => {
    setSearchErrorMessage();
    let initDate = Moment(inputDateFrom);
    let endDate = Moment(inputDateTo);
    if (initDate > endDate)
      return setSearchErrorMessage("Initial date is bigger than end date");
    props.searchByDates(initDate, endDate);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Search by date</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>From</Form.Label>
                <br />
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  value={formatDate(inputDateFrom)}
                  onDayChange={updateInputDateFrom}
                  inputProps={{ className: "form-control" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>To</Form.Label>
                <br />
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  value={formatDate(inputDateTo)}
                  onDayChange={updateInputDateTo}
                  inputProps={{ className: "form-control" }}
                />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-end mb-2">
              <Button onClick={onSearchSubmit}> Search </Button>
            </Col>
          </Row>
          <Row>
            <div className="invalid-feedback" style={{ display: "block" }}>
              {searchErrorMessage}
            </div>
          </Row>
        </Form>

        <Form>
          <Row>
            <Col>
              <hr />
              <h5> Filter options </h5>
            </Col>
          </Row>
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
            <Col>
              <Form.Group className="mb-3" controlId="formTypeFilter">
                <Form.Label>Income/Expense</Form.Label>
                <Select
                  name="transactionType"
                  options={displayTransactionType}
                  className="basic-multi-select"
                  classNamePrefix="select"
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
