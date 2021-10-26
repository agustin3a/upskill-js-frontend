import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { getFirebase } from "react-redux-firebase";

const middlewares = [thunk.withExtraArgument(getFirebase)];

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(...middlewares))
);

export default store;
