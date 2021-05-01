import { SET_PLAYLISTS } from "../constants";

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_PLAYLISTS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
