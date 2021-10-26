import {
  CATEGORY_UPDATE_CATEGORIES,
  CATEGORY_API_CALL_STARTED,
  CATEGORY_API_CALL_COMPLETED,
  CATEGORY_API_CALL_ERROR,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getCategories = () => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_API_CALL_STARTED });
  let userToken = getState().firebase.auth.stsTokenManager.accessToken;
  Axios.get("/categories", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      dispatch({
        type: CATEGORY_UPDATE_CATEGORIES,
        payload: response.data.categories,
      });
      dispatch({ type: CATEGORY_API_CALL_COMPLETED });
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: CATEGORY_API_CALL_ERROR,
          payload: error.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: CATEGORY_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
