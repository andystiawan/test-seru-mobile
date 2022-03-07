import { combineReducers } from "redux";
import ReducerRegister from "./ReducerRegister";
import ReducerPrevRegister from "./ReducerPrevRegister";

//Untuk mengkombinasikan reducer yang ada pada file reducer
const Reducer = combineReducers({
  ReducerRegister,
  ReducerPrevRegister
});

export default Reducer;
