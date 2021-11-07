import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import transactionReducer from "./transactionReducer";
import categoryReducer from './categoryReducer';
import accountReducer from './accountReducer';
import userReducer from './userReducer';
import currencyReducer from './currencyReducer';
import accountTypeReducer from './accountTypeReducer';
import transferReducer from './transferReducer';

export default combineReducers({
  firebase: firebaseReducer,
  transaction: transactionReducer,
  category: categoryReducer,
  account: accountReducer,
  user: userReducer,
  currency: currencyReducer,
  accountType : accountTypeReducer,
  transfer: transferReducer
});