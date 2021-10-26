import {
  USER_API_CALL_COMPLETED,
  USER_API_CALL_ERROR,
  USER_API_CALL_STARTED,
  USER_CREATED,
  USER_LOGOUT,
} from "./actionTypes";
import Axios from "axios";
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const createUser = (user,callback) => async (dispatch, getState, getFirebase) => {
  let { email, password, firstName, lastName } = user;
  dispatch({ type: USER_API_CALL_STARTED });
  const Firebase = getFirebase();
  Firebase.auth().createUserWithEmailAndPassword (email, password)
  .then((userData) => {
    console.log(userData);
    let userToken = getState().firebase.auth.stsTokenManager.accessToken;
    return Axios.post(
      "/user",
      { email, first_name: firstName, last_name: lastName },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    )
  }).then((response) => {
      dispatch({
        type: USER_CREATED,
        payload: response.data.accounts,
      });
      dispatch({ type: USER_API_CALL_COMPLETED });
      callback();
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        dispatch({
          type: USER_API_CALL_ERROR,
          payload: error.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: USER_API_CALL_ERROR,
          payload: "Service unavailable",
        });
      }
    });
};
