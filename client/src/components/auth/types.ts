import { RootState } from "./../../store/reducers/index";
import { register } from "./../../store/actions/auth";
import { thunkSetAlert } from "../../store/actions/alert";

import { connect, ConnectedProps } from "react-redux";
import { login } from "../../store/actions/auth";

const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
  thunkSetAlert,
  register,
  login,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IFormData {
  name: string;
  email: string;
  password: string;
  repeated_password: string;
}
