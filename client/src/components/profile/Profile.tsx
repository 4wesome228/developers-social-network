import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ConnectedProps } from "react-redux";
import { RouteChildrenProps, Link } from "react-router-dom";
import { RootState } from "../../store/reducers";
import { getProfileById } from "../../store/actions/profile";
import Spinner from "../spinner/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";

const Profile = ({
  match,
  getProfileById,
  auth,
  profile,
  loading,
  error,
}: Props) => {
  const id = match.params.id;

  useEffect(() => {
    getProfileById(id);
  }, []);

  if ((loading || profile === null) && !error) return <Spinner />;
  if (error)
    return <p className="lead">Looks like there is no user with such id...</p>;
  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back to profiles
      </Link>
      {auth.isAuth && !auth.loading && profile.user._id === auth.user._id && (
        <Link className="btn btn-dark " to="/edit-profile">
          Edit profile
        </Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {profile.experience.length > 0 ? (
          <>
            {profile.experience.map((exp, idx) => (
              <ProfileExperience key={idx} experience={exp} />
            ))}
          </>
        ) : (
          <p className="lead">
            No experience info <i className="far fa-sad-tear"></i>
          </p>
        )}
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education.length > 0 ? (
          <>
            {profile.education.map((edu, idx) => (
              <ProfileEducation key={idx} education={edu} />
            ))}
          </>
        ) : (
          <p className="lead">
            No education info <i className="far fa-sad-tear"></i>
          </p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    profile: state.profile.profile,
    error: state.profile.error,
    loading: state.profile.loading,
  };
};

const connector = connect(mapStateToProps, { getProfileById });
type Props = ConnectedProps<typeof connector> &
  RouteChildrenProps<{ id: string }>;

export default connector(Profile);
