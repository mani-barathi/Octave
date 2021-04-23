import { SET_ARTISTS } from "../constants";

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ARTISTS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
