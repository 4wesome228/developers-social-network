import { RootState } from "store/reducers";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export interface IAlert {
  id: string;
  msg: string;
  alertType: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterToken {
  token: string;
}

export type AppThunk<T extends Action> = ThunkAction<
  void,
  RootState,
  unknown,
  T
>;
export type PropertiesTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer R;
}
  ? R
  : never;
