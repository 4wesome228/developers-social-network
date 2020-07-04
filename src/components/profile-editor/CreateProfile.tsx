import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteChildrenProps } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import ProfileForm from "../profile-forms/ProfileForm";
import { createProfile, getCurrentProfile } from "../../store/actions/profile";
import { createProfileData } from "../../utils/create-profile-fields";
import { RootState } from "../../store/reducers";
import Spinner from "../spinner/Spinner";

const CreateProfile = (props: Props) => {
  const { loading, profile, history, createProfile, getCurrentProfile } = props;

  useEffect(() => getCurrentProfile(), []);
  const [isSocialsVisible, changeSocialsVisibility] = useState<boolean>(false);

  const onSumbit = () => {
    createProfile(values, history);
  };

  const { handleChange, handleSumbit, values } = useForm(onSumbit, {
    ...createProfileData,
    bio: "",
    status: "",
  });

  if (loading) return <Spinner />;
  if (profile !== null)
    return <p className="lead text-primary">You already have profile</p>;
  return (
    <ProfileForm
      handleChange={handleChange}
      handleSumbit={handleSumbit}
      pageHeadingText="Create"
      isSocialsVisible={isSocialsVisible}
      changeSocialsVisibility={changeSocialsVisibility}
      profileData={values}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.profile.loading,
  profile: state.profile.profile,
});

const connector = connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
});
type Props = ConnectedProps<typeof connector> & RouteChildrenProps;
export default connector(CreateProfile);
