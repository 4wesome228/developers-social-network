import axios from "axios";
import {
  AppThunk,
  PropertiesTypes,
  IRegisterPayload,
  IRegisterToken,
} from "./types";

import { thunkSetAlert } from "./alert";

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
    console.log(error.message);
    debugger;
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });

    dispatch(actions.registerFail(error.message));
  }
};

const actions = {
  registerRequest: () => ({ type: "FETCH_REGISTER_REQUEST" } as const),
  registerSuccess: (token: string) =>
    ({ type: "FETCH_REGISTER_SUCCESS", payload: token } as const),
  registerFail: (error: string) =>
    ({ type: "FETCH_REGISTER_FAILURE", payload: error } as const),
};

export type AuthActionTypes = ReturnType<PropertiesTypes<typeof actions>>;
