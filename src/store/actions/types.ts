export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export interface IAlert {
  id: string;
  msg: string;
  alertType: string;
}

export interface ISetAlert {
  payload: IAlert;
  type: typeof SET_ALERT;
}

export interface IRemoveAlert {
  type: typeof REMOVE_ALERT;
  payload: string;
}

export type ActionTypes = ISetAlert | IRemoveAlert;
