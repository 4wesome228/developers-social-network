import { AppThunk, PropertiesTypes } from "./types";

export const thunkSetAlert = (
  msg: string,
  alertType: string
): AppThunk<AlertActionsTypes> => (dispatch) => {
  const id = Date.now().toString();
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

export default actions.setAlert;

export type AlertActionsTypes = ReturnType<PropertiesTypes<typeof actions>>;
