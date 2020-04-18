import { register, AuthActionTypes } from "./../../store/actions/auth";
import { thunkSetAlert } from "../../store/actions/alert";
import { AppThunk } from "./../../store/actions/types";

import { connect, ConnectedProps } from "react-redux";

interface dispatchType {
  thunkSetAlert: (msg: string, alertType: string) => AppThunk<AuthActionTypes>;
  register: (object) => AppThunk<AuthActionTypes>;
}

const mapDispatchToProps: dispatchType = {
  thunkSetAlert,
  register,
};

export const connector = connect(null, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

//type AuthProps = PropsFromRedux;

export interface IFormData {
  name: string;
  email: string;
  password: string;
  repeated_password: string;
}
