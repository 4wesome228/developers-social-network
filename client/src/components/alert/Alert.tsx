import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PropsFromRedux, connector } from "./types";

const Alert: React.FC<PropsFromRedux> = ({ alerts, removeAlert }) => {
  const items =
    alerts.length > 0 &&
    alerts.map((alert) => (
      <CSSTransition
        key={alert.id}
        timeout={300}
        classNames="alert-transition"
        unmountOnExit
      >
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          <label htmlFor="alert__close">{alert.msg}</label>
          <input
            className="alert-input__close fa fa-times"
            type="checkbox"
            id="alert__close"
            onChange={() => removeAlert(alert.id)}
          />
        </div>
      </CSSTransition>
    ));

  return <TransitionGroup component={null}>{items}</TransitionGroup>;
};

export default connector(Alert);
