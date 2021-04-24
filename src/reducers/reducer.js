export const intialState = {
  playingSong: null,
};

export const reducer = (state, action) => {
  console.log("Reducer action", action);
  switch (action.type) {
    case "SET_PLAYING_SONG":
      return {
        ...state,
        playingSong: action.playingSong,
      };

    default:
      return state;
  }
};
