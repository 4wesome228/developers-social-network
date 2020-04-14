import { ISetAlert } from "./../../store/actions/types";
import { setAlert } from "../../store/actions/alertActions";

import { connect, ConnectedProps } from "react-redux";

interface dispatchType {
  setAlert: (msg: string, alertType: string) => ISetAlert;
}

const mapDispatchToProps: dispatchType = {
  setAlert,
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
