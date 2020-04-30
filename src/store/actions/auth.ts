import axios from "axios";
import {
  AppThunk,
  PropertiesTypes,
  IRegisterPayload,
  IRegisterToken,
  IUser,
  ILoginPayload,
} from "./types";

import { thunkSetAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

export const register = ({
  name,
  email,
  password,
}: IRegisterPayload): AppThunk<AuthActionTypes> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify({ name, email, password });

  try {
    dispatch(actions.registerRequest());
    const res = await axios.post<IRegisterToken>("/api/users", data, config);
    dispatch(actions.registerSuccess(res.data.token));
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });

    dispatch(actions.registerFail(error.message));
  }
};

export const login = ({
  email,
  password,
}: ILoginPayload): AppThunk<AuthActionTypes> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify({ email, password });

  try {
    dispatch(actions.loginRequest());
    const res = await axios.post<IRegisterToken>("/api/auth", data, config);
    dispatch(actions.loginSuccess(res.data.token));
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });

    dispatch(actions.loginFail(error.message));
  }
};

export const loadUserThunk = (): AppThunk<AuthActionTypes> => async (
  dispatch
) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get<IUser>("/api/auth");
    dispatch(actions.loadUser(res.data));
  } catch (error) {
    dispatch(actions.loadUserFail(error.message));
  }
};

const actions = {
  registerRequest: () => ({ type: "FETCH_REGISTER_REQUEST" } as const),
  registerSuccess: (token: string) =>
    ({ type: "FETCH_REGISTER_SUCCESS", payload: token } as const),
  registerFail: (error: string) =>
    ({ type: "FETCH_REGISTER_FAILURE", payload: error } as const),
  loadUser: (user: IUser) => ({ type: "USER_LOADED", payload: user } as const),
  loadUserFail: (error: string) =>
    ({ type: "USER_LOAD_FAILURE", payload: error } as const),
  loginRequest: () => ({ type: "FETCH_LOGIN_REGUEST" } as const),
  loginSuccess: (token: string) =>
    ({ type: "FETCH_LOGIN_SUCCESS", payload: token } as const),
  loginFail: (error: string) =>
    ({ type: "FETCH_LOGIN_FAILURE", payload: error } as const),
  logout: () => ({ type: "LOGOUT" } as const),
};

export const logout = actions.logout;

export type AuthActionTypes = PropertiesTypes<typeof actions>;
