import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import {
  Col,
  Row,
  Pagination,
  Spinner,
  Card,
  Fade,
  Collapse,
} from "react-bootstrap";
import TransactionsHistoryFilter from "./TransactionsHistoryFilter";
import TransactionItem from "./TransactionItem";
import { getByDisplayValue } from "@testing-library/dom";

function TransactionsHistory(props) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Data
  // Categories list
  const categories = [
    "Groceries",
    "Entertainment",
    "Transfer",
    "Transport",
    "Gifts",
    "Medicine",
    "Studies",
    "Services",
  ];
  // Bank accounts
  const bankAccounts = ["2342342", "2112223", "11132344"];

  // Auxiliar function to generate data
  const generateTransactionItems = (numberOfItems) => {
    let stores = [
      "Budget",
      "Walmart",
      "Apple store",
      "Spotify",
      "Movies",
      "Laptop",
      "React.js Upskill Program",
      "Gas",
      "Max",
    ];
    let transactionTypes = ["Expense", "Income"];
    let currencies = ["USD", "GTQ"];
    let transactionItems = [];
    for (let i = 0; i < numberOfItems; i++) {
      transactionItems.push({
        transactionType:
          transactionTypes[(Math.random() * transactionTypes.length) | 0],
        category: categories[(Math.random() * categories.length) | 0],
        targetAccountName: stores[(Math.random() * stores.length) | 0],
        bankAccount: bankAccounts[(Math.random() * bankAccounts.length) | 0],
        currency: currencies[(Math.random() * currencies.length) | 0],
        amount: Math.random() * (i + 1) * 100,
        date: new Date(),
        key: i,
      });
    }
    return transactionItems;
  };

  // Filters variables
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [bankAccountsFilter, setBankAccountsFilter] = useState([]);
  // Set transaction items list
  const [transactionItems, setTransactionItems] = useState(
    generateTransactionItems(10)
  );
  const [filteredTransactionItems, setFilteredTransactionItems] = useState(
    transactionItems.slice()
  );

  const [waitingForTransactions, setWaitingForTransactions] = useState(false);

  // Update categories and bank accounts filter functions
  const updateCategoriesFilter = (categoriesFilter) =>
    setCategoriesFilter(categoriesFilter);

  const updateBankAccountsFilter = (bankAccountsFilter) =>
    setBankAccountsFilter(bankAccountsFilter);

  const searchByDates = async (startDate, endDate) => {
    setWaitingForTransactions(true);
    await sleep(3000);
    setTransactionItems(generateTransactionItems(10));
    setWaitingForTransactions(false);
  };

  // Update transaction items list by category and bank account filters
  useEffect(() => {
    let newTransactionItems = transactionItems.slice();
    // Filter by categories
    if (categoriesFilter && categoriesFilter.length > 0) {
      newTransactionItems = _.filter(transactionItems, (transactionItem) => {
        return (
          _.findIndex(categoriesFilter, ["value", transactionItem.category]) >=
          0
        );
      });
    }
    // Fillter by bank accounts
    if (bankAccountsFilter && bankAccountsFilter.length > 0) {
      newTransactionItems = _.filter(newTransactionItems, (transactionItem) => {
        return (
          _.findIndex(bankAccountsFilter, [
            "value",
            transactionItem.bankAccount,
          ]) >= 0
        );
      });
    }
    // Update transaction items list
    setFilteredTransactionItems(newTransactionItems);
  }, [categoriesFilter, bankAccountsFilter, transactionItems]);

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          {" "}
          <Card.Title> {props.title} </Card.Title>{" "}
        </Card.Header>
        <Card.Body>
          {props.showFilter && (
            <div>
              <Row>
                <Col>
                  <TransactionsHistoryFilter
                    categories={categories}
                    bankAccounts={bankAccounts}
                    updateCategoriesFilter={updateCategoriesFilter}
                    updateBankAccountsFilter={updateBankAccountsFilter}
                    searchByDates={searchByDates}
                  />
                </Col>
              </Row>
              <hr></hr>
            </div>
          )}
          {waitingForTransactions && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}

          <Fade in={!waitingForTransactions} appear={true}>
            <div>
              <Row>
                <Col>
                  {filteredTransactionItems.map((transactionItemData) => (
                    <TransactionItem {...transactionItemData} />
                  ))}
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item key={1} active={true}>
                      1
                    </Pagination.Item>
                    <Pagination.Item key={2} active={false}>
                      2
                    </Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </Fade>
        </Card.Body>
      </Card>
    </>
  );
}

export default TransactionsHistory;
