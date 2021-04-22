import { SET_NEW_RELEASES } from "../constants";

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_NEW_RELEASES:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
