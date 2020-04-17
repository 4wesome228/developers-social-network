import axios from "axios";
import {
  IRegisterPayload,
  AppThunk,
  IRegisterToken,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
} from "./types";

import { thunkSetAlert } from "./alertActions";

export const register = ({
  name,
  email,
  password,
}: IRegisterPayload): AppThunk => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify({ name, email, password });

  try {
    dispatch({ type: FETCH_REGISTER_REQUEST });
    const res = await axios.post<IRegisterToken>("/api/users", data, config);
    dispatch({ type: FETCH_REGISTER_SUCCESS, payload: res.data.token });
  } catch (error) {
    console.log(error.message);
    debugger;
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });

    dispatch({ type: FETCH_REGISTER_FAILURE, payload: error.message });
  }
};
