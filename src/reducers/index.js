import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newReleasesReducer from "./newReleasesReducer";
import artistsReducer from "./artistsReducer";
import currentSessionReducer from "./currentSessionReducer";

const reducers = combineReducers({
  user: authReducer,
  newReleases: newReleasesReducer,
  artists: artistsReducer,
  currentSession: currentSessionReducer,
});

export default reducers;
