import { LOGIN_USER, LOGOUT_USER } from "../constants";

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: null,
});
