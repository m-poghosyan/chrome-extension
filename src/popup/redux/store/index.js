import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import couponsReducer from "./../reducers/couponsReducer";
import thunkMiddleware from "redux-thunk";
import shopsReducer from "../reducers/shopsReducer";
import appReducer from "../reducers/appReducer";
import profileReducer from "../reducers/profileReducer";

const redusers = combineReducers({
  couponsTab: couponsReducer,
  shopsTab: shopsReducer,
  profile: profileReducer,
  app: appReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  redusers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
window.store = store;
export default store;
