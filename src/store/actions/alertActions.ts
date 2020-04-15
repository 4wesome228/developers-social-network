import { RootState } from "./../reducers/index";
import {
  SET_ALERT,
  ISetAlert,
  REMOVE_ALERT,
  IRemoveAlert,
  ActionTypes,
} from "./types";
import { ThunkAction } from "redux-thunk";

export const thunkSetAlert = (
  msg: string,
  alertType: string
): ThunkAction<void, RootState, unknown, ActionTypes> => (dispatch) => {
  const id = Date.now().toString();
  dispatch(setAlert(msg, alertType, id));
  setTimeout(() => dispatch(removeAlert(id)), 3000);
};

const setAlert = (msg: string, alertType: string, id: string): ISetAlert => ({
  type: SET_ALERT,
  payload: { msg, alertType, id },
});

const removeAlert = (id: string): IRemoveAlert => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
