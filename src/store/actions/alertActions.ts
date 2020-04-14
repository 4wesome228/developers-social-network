import { SET_ALERT, ISetAlert } from "./types";

export const setAlert = (msg: string, alertType: string): ISetAlert => {
  const id = Date.now().toString();
  return {
    type: SET_ALERT,
    payload: { msg, alertType, id },
  };
};
