import {
  TRANSACTION_UPDATE_LATEST_TRANSACTIONS,
  TRANSACTION_API_CALL_STARTED,
  TRANSACTION_API_CALL_COMPLETED,
  TRANSACTION_API_CALL_ERROR,
  TRANSACTION_API_CALL_RESET,
  TRANSACTION_ADD_TRANSACTION
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const resetAPIFlags = () => async (dispatch) => {
  dispatch({ type: TRANSACTION_API_CALL_RESET });
};

export const getLatestTransactions = () => async (dispatch, getState) => {
  dispatch({ type: TRANSACTION_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/transactions", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: TRANSACTION_UPDATE_LATEST_TRANSACTIONS,
        payload: response.data.transactions,
      });
      dispatch({ type: TRANSACTION_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: error.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const createTransaction = (transaction) => async (dispatch, getState) => {
  dispatch({ type: TRANSACTION_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  transaction.display = true;
  Axios.post("/transaction", transaction, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: TRANSACTION_ADD_TRANSACTION,
        payload: response.data.transaction,
      });
      
      dispatch({ type: TRANSACTION_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const getTransaction = (id) => async (dispatch, getState) => {
  dispatch({ type: TRANSACTION_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/transaction/" + id, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: TRANSACTION_ADD_TRANSACTION,
        payload: response.data.transaction,
      });
      dispatch({ type: TRANSACTION_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};


export const updateTransaction = (id, values) => async (dispatch, getState) => {
  dispatch({ type: TRANSACTION_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  values.display = true;
  Axios.put("/transaction/" + id, values, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: TRANSACTION_ADD_TRANSACTION,
        payload: response.data.transaction,
      });
      dispatch({ type: TRANSACTION_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: TRANSACTION_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};