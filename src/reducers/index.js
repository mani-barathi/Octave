import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newReleasesReducer from "./newReleasesReducer";
import artistsReducer from "./artistsReducer";

const reducers = combineReducers({
  user: authReducer,
  newReleases: newReleasesReducer,
  artists: artistsReducer,
});

export default reducers;
