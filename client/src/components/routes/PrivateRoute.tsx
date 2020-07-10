import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { RootState } from "../../store/reducers";
import { connect } from "react-redux";

const PrivateRoute: React.FC<RouteProps & PropsFromRedux> = ({
  component: Component,
  isAuth,
  loading,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to={"/login"} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  };
};

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

export default connect<PropsFromRedux>(mapStateToProps, null)(PrivateRoute);
