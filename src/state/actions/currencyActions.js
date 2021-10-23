import {
  CURRENCY_API_CALL_COMPLETED,
  CURRENCY_API_CALL_ERROR,
  CURRENCY_API_CALL_STARTED,
  CURRENCY_UPDATE_CURRENCIES,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getCurrencies = () => async (dispatch, getState) => {
  dispatch({ type: CURRENCY_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/currencies", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: CURRENCY_UPDATE_CURRENCIES,
        payload: response.data.currencies,
      });
      dispatch({ type: CURRENCY_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: CURRENCY_API_CALL_ERROR,
          payload: error.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: CURRENCY_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
