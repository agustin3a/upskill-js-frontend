import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { Col, Row } from "react-bootstrap";
import TransactionsHistoryFilter from "./TransactionsHistoryFilter";
import TransactionItem from "./TransactionItem";

function TransactionsHistory() {
  // Filters variables
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [bankAccountsFilter, setBankAccountsFilter] = useState([]);

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

  // Set transaction items list
  const [transactionItems, setTransactionItems] = useState(
    generateTransactionItems(10)
  );
  const [filteredTransactionItems, setFilteredTransactionItems] = useState(
    transactionItems.slice()
  );

  // Update categories and bank accounts filter functions
  const updateCategoriesFilter = (categoriesFilter) =>
    setCategoriesFilter(categoriesFilter);

  const updateBankAccountsFilter = (bankAccountsFilter) =>
    setBankAccountsFilter(bankAccountsFilter);

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
  }, [categoriesFilter, bankAccountsFilter]);

  return (
    <>
      <h3>Transactions history</h3>
      <Row>
        <Col>
          <TransactionsHistoryFilter
            categories={categories}
            bankAccounts={bankAccounts}
            updateCategoriesFilter={updateCategoriesFilter}
            updateBankAccountsFilter={updateBankAccountsFilter}
          />
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          {filteredTransactionItems.map((transactionItemData) => (
            <TransactionItem {...transactionItemData} />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default TransactionsHistory;
