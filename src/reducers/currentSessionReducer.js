import {
  SET_NEW_SONG,
  SET_PLAYING_SONG,
  SET_SONG_INDEX,
  INC_SONG_INDEX,
  DEC_SONG_INDEX,
  // SET_ARTIST,
  TOGGLE_IS_SONGLIST_OPEN,
} from "../constants";

const initialState = {
  playingSong: null,
  newSong: null,
  songIndex: -1,
  isSongListOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYING_SONG:
      return {
        ...state,
        playingSong: action.payload,
      };

    case SET_NEW_SONG:
      return {
        ...state,
        newSong: action.payload,
      };
    case SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.payload,
      };

    case INC_SONG_INDEX:
      return {
        ...state,
        songIndex: state.songIndex + 1,
      };

    case DEC_SONG_INDEX:
      return {
        ...state,
        songIndex: state.songIndex - 1,
      };

    // case SET_ARTIST:
    //   return {
    //     ...state,
    //     artist: action.payload,
    //   };

    case TOGGLE_IS_SONGLIST_OPEN:
      return {
        ...state,
        isSongListOpen: !state.isSongListOpen,
      };

    default:
      return state;
  }
};

export default reducer;
