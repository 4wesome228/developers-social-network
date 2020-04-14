import React from "react";
import { PropsFromRedux, connector } from "./types";

const Alert = ({ alerts }: PropsFromRedux) => {
  return (
    alerts.length > 0 && (
      <>
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
      </>
    )
  );
};

export default connector(Alert);
