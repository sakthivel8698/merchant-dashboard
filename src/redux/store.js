import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  orders: orderReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
