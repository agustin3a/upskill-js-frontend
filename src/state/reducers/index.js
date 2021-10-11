import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import transactionReducer from "./transactionReducer";
import categoryReducer from './categoryReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  firebase: firebaseReducer,
  transaction: transactionReducer,
  category: categoryReducer,
  account: accountReducer
});