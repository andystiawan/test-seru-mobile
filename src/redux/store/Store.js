import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "../reducer/Reducer";

const middleware = [thunk];

//untuk menggabungkan reducer dengan redux thunk dan di sediakan sebagai store
const Store = createStore(
  Reducer,
  applyMiddleware(...middleware)
);

export default Store;