import { SET_ARTISTS } from "../constants";

export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  payload: artists,
});
