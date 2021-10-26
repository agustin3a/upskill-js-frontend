import {
  ACCOUNT_TYPE_API_CALL_COMPLETED,
  ACCOUNT_TYPE_API_CALL_ERROR,
  ACCOUNT_TYPE_API_CALL_STARTED,
  ACCOUNT_TYPE_UPDATE_ACCOUNT_TYPES,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getAccountTypes = () => async (dispatch, getState) => {
  dispatch({ type: ACCOUNT_TYPE_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/accountTypes", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: ACCOUNT_TYPE_UPDATE_ACCOUNT_TYPES,
        payload: response.data.accountTypes,
      });
      dispatch({ type: ACCOUNT_TYPE_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: ACCOUNT_TYPE_API_CALL_ERROR,
          payload: error.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: ACCOUNT_TYPE_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
