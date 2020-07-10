import { AppThunk, PropertiesTypes } from "./types";

export enum ALERT_TYPE {
  "gray" = "gray",
  "success" = "success",
  "danger" = "danger",
}

export const thunkSetAlert = (
  msg: string,
  alertType: ALERT_TYPE
): AppThunk<AlertActionsTypes> => (dispatch) => {
  const id = (
    new Date().valueOf() * Math.round(Math.random() * 10000)
  ).toString();
  dispatch(actions.setAlert(msg, alertType, id));
  setTimeout(() => dispatch(actions.removeAlert(id)), 3000);
};

const actions = {
  setAlert: (msg: string, alertType: string, id: string) =>
    ({
      type: "SET_ALERT",
      payload: { msg, alertType, id },
    } as const),
  removeAlert: (id: string) =>
    ({
      type: "REMOVE_ALERT",
      payload: id,
    } as const),
};

const { setAlert, removeAlert } = actions;
export { setAlert, removeAlert };

export type AlertActionsTypes = PropertiesTypes<typeof actions>;
