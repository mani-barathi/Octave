import { SET_PLAYLISTS } from "../constants";

export const setPlaylists = (playlists) => ({
  type: SET_PLAYLISTS,
  payload: playlists,
});
