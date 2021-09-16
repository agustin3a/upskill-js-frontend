import React from "react";
import { Col, Row } from "react-bootstrap";
import TransactionsHistoryFilter from "./TransactionsHistoryFilter";
import TransactionItem from "./TransactionItem";

function TransactionsHistory() {

  const generateTransactionItems = (numberOfItems) => {
    let categories = [
      "Groceries",
      "Entertainment",
      "Transfer",
      "Transport",
      "Gifts",
      "Medicine",
      "Studies",
      "Services",
    ];
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
    let bankAccounts = ["2342342", "2112223", "11132344"];
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
        amount: Math.random() * (i+1) * 100,
        date: new Date()
      });
    }
    return transactionItems;
  };

  return (
    <>
      <h3>Transactions history</h3>
      <hr></hr>
      <Row>
        <Col>
          <TransactionsHistoryFilter />
        </Col>
      </Row>
      <Row>
        <Col>
          {generateTransactionItems(10).map((transactionItemData) => (
            <TransactionItem {...transactionItemData} />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default TransactionsHistory;
