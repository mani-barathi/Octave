import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newReleasesReducer from "./newReleasesReducer";
import artistsReducer from "./artistsReducer";
import currentSessionReducer from "./currentSessionReducer";
import playListReducer from "./playListReducer";
import { LOGOUT_USER } from "../constants";

const allReducers = combineReducers({
  user: authReducer,
  newReleases: newReleasesReducer,
  artists: artistsReducer,
  currentSession: currentSessionReducer,
  playlists: playListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

export default rootReducer;
