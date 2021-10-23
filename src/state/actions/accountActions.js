import {
  ACCOUNT_UPDATE_ACCOUNTS,
  ACCOUNT_API_CALL_STARTED,
  ACCOUNT_API_CALL_COMPLETED,
  ACCOUNT_API_CALL_ERROR,
  ACCOUNT_ADD_ACCOUNT,
  ACCOUNT_API_CALL_RESET,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const resetAPIFlags = () => async (dispatch) => {
  dispatch({ type: ACCOUNT_API_CALL_RESET });
};

export const getAccounts = () => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/accounts", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: ACCOUNT_UPDATE_ACCOUNTS,
        payload: response.data.accounts,
      });
      dispatch({ type: ACCOUNT_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const createAccount = (account) => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  account.active = true;
  Axios.post("/account", account, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: ACCOUNT_ADD_ACCOUNT,
        payload: response.data.account,
      });
      dispatch({ type: ACCOUNT_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const getAccount = (id) => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/account/" + id, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: ACCOUNT_ADD_ACCOUNT,
        payload: response.data.account,
      });
      dispatch({ type: ACCOUNT_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const updateAccount = (id, values) => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.put("/account/" + id, values, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: ACCOUNT_ADD_ACCOUNT,
        payload: response.data.account,
      });
      dispatch({ type: ACCOUNT_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: ACCOUNT_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
