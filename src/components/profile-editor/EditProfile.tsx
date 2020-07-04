import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

import Spinner from "../spinner/Spinner";
import ProfileForm from "../profile-forms/ProfileForm";
import { RootState } from "../../store/reducers";
import { createProfile, getCurrentProfile } from "../../store/actions/profile";
import { extractProfileFields } from "../../store/selectors/profile-selector";
import { RouteChildrenProps } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import { createProfileData } from "../../utils/create-profile-fields";

const EditProfile = (props: Props) => {
  const { loading, profile, history, createProfile, getCurrentProfile } = props;

  const [isSocialsVisible, changeSocialsVisibility] = useState<boolean>(false);

  const onSumbit = () => {
    createProfile(values, history, true);
  };

  const {
    handleChange,
    handleSumbit,
    values,
    optionalDataChanger,
  } = useForm(onSumbit, { ...createProfileData, bio: "", status: "" });

  useEffect(() => {
    profile === null && getCurrentProfile();
    optionalDataChanger((setFormData, formData) => {
      setFormData({ ...formData, ...profile });
    });
  }, [profile]);

  if (loading) return <Spinner />;

  return (
    <ProfileForm
      handleChange={handleChange}
      handleSumbit={handleSumbit}
      pageHeadingText="Edit"
      isSocialsVisible={isSocialsVisible}
      changeSocialsVisibility={changeSocialsVisibility}
      profileData={values}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.profile.loading,
  profile: extractProfileFields(state.profile.profile),
});

const connector = connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
});

type Props = ConnectedProps<typeof connector> & RouteChildrenProps;

export default connector(EditProfile);
