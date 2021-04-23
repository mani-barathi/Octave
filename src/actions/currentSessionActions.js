import {
  SET_NEW_SONG,
  SET_PLAYING_SONG,
  SET_SONG_INDEX,
  INC_SONG_INDEX,
  DEC_SONG_INDEX,
  SET_ARTIST,
  TOGGLE_IS_SONGLIST_OPEN,
} from "../constants";

export const setNewSong = (newSong) => ({
  type: SET_NEW_SONG,
  payload: newSong,
});

export const setPlayingSong = (song) => ({
  type: SET_PLAYING_SONG,
  payload: song,
});

export const incSongIndex = () => ({
  type: INC_SONG_INDEX,
  payload: null,
});

export const decSongIndex = () => ({
  type: DEC_SONG_INDEX,
  payload: null,
});

export const setSongIndex = (index) => ({
  type: SET_SONG_INDEX,
  payload: index,
});

export const toggleIsSongListOpen = (index) => ({
  type: TOGGLE_IS_SONGLIST_OPEN,
  payload: index,
});

export const setArtist = () => ({
  type: SET_ARTIST,
  payload: null,
});
