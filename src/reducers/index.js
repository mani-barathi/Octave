import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newReleasesReducer from "./newReleasesReducer";
import artistsReducer from "./artistsReducer";
import currentSessionReducer from "./currentSessionReducer";
import playListReducer from "./playListReducer";

const reducers = combineReducers({
  user: authReducer,
  newReleases: newReleasesReducer,
  artists: artistsReducer,
  currentSession: currentSessionReducer,
  playlists: playListReducer,
});

export default reducers;
