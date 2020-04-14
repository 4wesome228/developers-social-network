import { ActionTypes, IAlert } from "./../actions/types";
import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

type AlertState = Array<IAlert>;
const initialState: AlertState = [];

export const alertReducer = (
  state = initialState,
  action: ActionTypes
): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
