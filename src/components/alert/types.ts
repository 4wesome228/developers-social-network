import { IAlert } from "./../../store/actions/types";
import { RootState } from "./../../store/reducers/index";

import { connect, ConnectedProps } from "react-redux";

export type IMapState = {
  alerts: Array<IAlert>;
};

export const mapStateToProps = (state: RootState): IMapState => ({
  alerts: state.alerts,
});

export const connector = connect(mapStateToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
