import { RootState } from "store/reducers";
import { ThunkAction } from "redux-thunk";

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

export const FETCH_REGISTER_REQUEST = "FETCH_REGISTER_REQUEST";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";
export const FETCH_REGISTER_FAILURE = "FETCH_REGISTER_FAILURE";

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterToken {
  token: string;
}

export interface IRegisterSuccess {
  type: typeof FETCH_REGISTER_SUCCESS;
  payload: string;
}

export interface IRegisterFailure {
  type: typeof FETCH_REGISTER_FAILURE;
  payload: string;
}

export interface IRegisterRequest {
  type: typeof FETCH_REGISTER_REQUEST;
}

export type ActionTypes =
  | ISetAlert
  | IRemoveAlert
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailure;

export type AppThunk = ThunkAction<void, RootState, unknown, ActionTypes>;
