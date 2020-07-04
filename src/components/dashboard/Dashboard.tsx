import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { getCurrentProfile } from "../../store/actions/profile";
import { deleteAccount } from "../../store/actions/auth";
import { RootState } from "../../store/reducers";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard: React.FC<PropsFromRedux> = ({
  loading,
  profile,
  user,
  getCurrentProfile,
  deleteAccount,
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
        <>
          <DashboardActions />
          <Experience
            experience={profile.experience ? profile.experience : []}
          />
          <Education education={profile.education ? profile.education : []} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary">
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

const connector = connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
