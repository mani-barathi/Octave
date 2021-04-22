import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newReleasesReducer from "./newReleasesReducer";

const reducers = combineReducers({
  user: authReducer,
  newReleases: newReleasesReducer,
});

export default reducers;
