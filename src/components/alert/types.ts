import { RootState } from "./../../store/reducers/index";

import { connect, ConnectedProps } from "react-redux";
import { removeAlert } from "../../store/actions/alert";

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
});

export const connector = connect(mapStateToProps, { removeAlert });

export type PropsFromRedux = ConnectedProps<typeof connector>;
