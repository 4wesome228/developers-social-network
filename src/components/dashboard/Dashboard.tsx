import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../store/actions/profile";
import { RootState } from "../../store/reducers";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard: React.FC<MapDispatch & MapState> = ({
  loading,
  profile,
  user,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (loading && profile === null) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <DashboardActions />
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile " className="btn btn-primary">
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.user,
    loading: state.profile.loading,
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = {
  getCurrentProfile,
};

type MapState = ReturnType<typeof mapStateToProps>;
type MapDispatch = typeof mapDispatchToProps;

export default connect<MapState, MapDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
