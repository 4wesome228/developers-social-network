import { AlertActionsTypes } from "../actions/alert";
import { IAlert } from "./../actions/types";

type AlertState = Array<IAlert>;
const initialState: AlertState = [];

export const alertReducer = (
  state = initialState,
  action: AlertActionsTypes
): AlertState => {
  switch (action.type) {
    case "SET_ALERT":
      return [...state, action.payload];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
