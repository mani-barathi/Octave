import { combineReducers } from "redux";
import authReducer from "./authReducer";

const reducers = combineReducers({
  user: authReducer,
});

export default reducers;
