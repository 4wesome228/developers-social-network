import { register } from "./../../store/actions/auth";
import { thunkSetAlert } from "./../../store/actions/alertActions";
import { AppThunk } from "./../../store/actions/types";

import { connect, ConnectedProps } from "react-redux";

interface dispatchType {
  thunkSetAlert: (msg: string, alertType: string) => AppThunk;
  register: (object) => AppThunk;
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
