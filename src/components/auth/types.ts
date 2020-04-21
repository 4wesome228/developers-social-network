import { RootState } from "./../../store/reducers/index";
import { register, AuthActionTypes } from "./../../store/actions/auth";
import { thunkSetAlert } from "../../store/actions/alert";
import { AppThunk } from "./../../store/actions/types";

import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({ loading: state.auth.loading });

interface IMapDispatch {
  thunkSetAlert: (msg: string, alertType: string) => AppThunk<AuthActionTypes>;
  register: (object) => AppThunk<AuthActionTypes>;
}

const mapDispatchToProps: IMapDispatch = {
  thunkSetAlert,
  register,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IFormData {
  name: string;
  email: string;
  password: string;
  repeated_password: string;
}
