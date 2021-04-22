import { SET_NEW_RELEASES } from "../constants";

export const setNewReleases = (songs) => ({
  type: SET_NEW_RELEASES,
  payload: songs,
});
