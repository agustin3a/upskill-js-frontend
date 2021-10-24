import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { Col, Row, Pagination, Spinner, Card, Alert } from "react-bootstrap";
import TransactionsHistoryFilter from "./TransactionsHistoryFilter";
import TransactionItem from "./TransactionItem";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as transactionActionsCreators from "../../state/actions/transactionActions";
import * as categoryActionsCreators from "../../state/actions/categoryActions";
import * as accountActionsCreators from "../../state/actions/accountActions";

function TransactionsHistory(props) {
  // Categories and accounts maps
  const [categoriesMap, setCategoriesMap] = useState([]);
  const [accountsMap, setAccountsMap] = useState([]);
  // Filters variables
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [bankAccountsFilter, setBankAccountsFilter] = useState([]);
  // Local filtered transaction list
  const [filteredTransactionItems, setFilteredTransactionItems] = useState([]);
  // Reducers
  const transactionState = useSelector((state) => state.transaction);
  const categoryState = useSelector((state) => state.category);
  const accountState = useSelector((state) => state.account);
  // Action creators
  const dispatch = useDispatch();
  const { getLatestTransactions } = bindActionCreators(
    transactionActionsCreators,
    dispatch
  );
  const { getCategories } = bindActionCreators(
    categoryActionsCreators,
    dispatch
  );
  const { getAccounts } = bindActionCreators(accountActionsCreators, dispatch);
  // Display variables
  const categories = useSelector((state) => state.category.categories);
  const accounts = useSelector((state) => state.account.accounts);
  const transactionList = useSelector(
    (state) => state.transaction.latestTransactions
  );

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Update categories and bank accounts filter functions
  const updateCategoriesFilter = (categoriesFilter) =>
    setCategoriesFilter(categoriesFilter);

  const updateBankAccountsFilter = (bankAccountsFilter) =>
    setBankAccountsFilter(bankAccountsFilter);

  // Search transaction by date handler
  const searchByDates = async (startDate, endDate) => {
    await sleep(3000);
    //setTransactionItems(generateTransactionItems(10));
  };

  // Update transaction items list by category and bank account filters
  useEffect(() => {
    let newTransactionItems = transactionList.slice();
    // Filter by categories
    if (categoriesFilter && categoriesFilter.length > 0) {
      newTransactionItems = _.filter(newTransactionItems, (transactionItem) => {
        return (
          _.findIndex(categoriesFilter, ["value", transactionItem.Category.id]) >=
          0
        );
      });
    }
    // Fillter by bank accounts
    if (bankAccountsFilter && bankAccountsFilter.length > 0) {
      newTransactionItems = _.filter(newTransactionItems, (transactionItem) => {
        return (
          _.findIndex(bankAccountsFilter, ["value", transactionItem.Account.id]) >=
          0
        );
      });
    }
    // Update transaction items list
    setFilteredTransactionItems(newTransactionItems);
  }, [categoriesFilter, bankAccountsFilter, transactionList]);

  // Get data from API
  useEffect(() => {
    getLatestTransactions();
    getCategories();
    getAccounts();
  }, []);

  // Create maps for categories and accounts list used by the transaction item component
  useEffect(() => {
    let newCategoriesMap = [];
    categories.forEach((category) => {
      newCategoriesMap[category.id] = category;
    });
    setCategoriesMap(newCategoriesMap);
    let newAccountsMap = [];
    accounts.forEach((account) => {
      newAccountsMap[account.id] = account;
    });
    setAccountsMap(newAccountsMap);
  }, [categories, accounts]);

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          {" "}
          <Card.Title> {props.title} </Card.Title>{" "}
        </Card.Header>

        <Card.Body>
          <section>
            {(props.showFilter && transactionState.apiCallCompleted &&
              categoryState.apiCallCompleted &&
              accountState.apiCallCompleted) && (
              <div>
                <Row>
                  <Col>
                    <TransactionsHistoryFilter
                      categories={categories}
                      accounts={accounts}
                      updateCategoriesFilter={updateCategoriesFilter}
                      updateBankAccountsFilter={updateBankAccountsFilter}
                      searchByDates={searchByDates}
                    />
                  </Col>
                </Row>
                <hr></hr>
              </div>
            )}
            {(transactionState.apiCallInProgress ||
              categoryState.apiCallInProgress ||
              accountState.apiCallInProgress) && (
              <Row>
                <Col className="d-flex justify-content-center">
                  <Spinner animation="grow" variant="dark" />
                </Col>
              </Row>
            )}
            {(transactionState.apiCallCompleted &&
              categoryState.apiCallCompleted &&
              accountState.apiCallCompleted) && (
              <div>
                <Row>
                  <Col>
                    {filteredTransactionItems.map(
                      (transactionItemData, index) => (
                        <TransactionItem
                          {...transactionItemData}
                          key={index}
                          categories={categoriesMap}
                          accounts={accountsMap}
                        />
                      )
                    )}
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
            )}
            {(transactionState.apiCallError ||
              categoryState.apiCallError ||
              accountState.apiCallError) && (
              <Alert variant="danger"  >
                <Alert.Heading className="d-flex justify-content-center">Something went wrong on our end! :(</Alert.Heading>
                <p className="d-flex justify-content-center">
                  Some services are unavailabe righ now, please try again later.
                </p>
              </Alert>
            )}
          </section>
        </Card.Body>
      </Card>
    </>
  );
}

export default TransactionsHistory;
