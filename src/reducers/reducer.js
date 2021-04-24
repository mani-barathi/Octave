export const intialState = {
  playingSong: null,
  newSong: null,
};

export const reducer = (state, action) => {
  console.log("Reducer action", action);
  switch (action.type) {
    case "SET_PLAYING_SONG":
      return {
        ...state,
        playingSong: action.playingSong,
      };

    case "SET_NEW_SONG":
      return {
        ...state,
        newSong: action.newSong,
      };

    default:
      return state;
  }
};
