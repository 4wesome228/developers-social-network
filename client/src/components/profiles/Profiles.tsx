import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { getProfiles } from "../../store/actions/profile";
import { RootState } from "../../store/reducers";

import Spinner from "../spinner/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = (props: PropsFromRedux) => {
  const { getProfiles, profiles, loading } = props;

  useEffect(() => {
    getProfiles();
  }, []);
  if (loading && profiles.length === 0) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});

const connector = connect(mapStateToProps, { getProfiles });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profiles);
