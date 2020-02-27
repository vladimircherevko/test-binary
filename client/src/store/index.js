import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { listReducer, errorReducer } from "./reducers";

const rootReducer = combineReducers({
  list: listReducer,
  error: errorReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
