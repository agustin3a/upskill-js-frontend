import {
  TRANSFER_API_CALL_STARTED,
  TRANSFER_API_CALL_COMPLETED,
  TRANSFER_API_CALL_ERROR,
  TRANSFER_API_CALL_RESET,
  TRANSFER_ADD_TRANSFER,
  TRANSFER_ADD_VALIDATE_TRANSFER,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const resetAPIFlags = () => async (dispatch) => {
  dispatch({ type: TRANSFER_API_CALL_RESET });
};

export const validateTransfer = (values) => async (dispatch, getState) => {
  dispatch({ type: TRANSFER_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.post("/transfer/validate", values, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: TRANSFER_ADD_VALIDATE_TRANSFER,
          payload: response.data.transfer,
        });
        dispatch({ type: TRANSFER_API_CALL_COMPLETED });
      } else {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};

export const createTransfer = (values) => async (dispatch, getState) => {
  dispatch({ type: TRANSFER_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.post("/transfer", values, {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: TRANSFER_ADD_TRANSFER,
          payload: response.data.transfer,
        });
        dispatch({ type: TRANSFER_API_CALL_COMPLETED });
      } else {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: TRANSFER_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
