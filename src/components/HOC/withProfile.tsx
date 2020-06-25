import React, {
  useState,
  useEffect,
  ComponentType,
  Dispatch,
  SetStateAction,
} from "react";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";

import { RootState } from "../../store/reducers";
import { extractProfileFields } from "../../store/selectors/profile-selector";
import Spinner from "../spinner/Spinner";
import { createProfile, getCurrentProfile } from "../../store/actions/profile";
import {
  ProfileDataType,
  createProfileData,
} from "../../utils/create-profile-fields";

type ProfileHOCInjectedProps = {
  isSocialsVisible: boolean;
  changeSocialsVisibility: Dispatch<SetStateAction<boolean>>;
  profileData: ProfileDataType;
  handleSumbit: (e: any) => void;
  handleChange: (e: any) => void;
  pageHeadingText: string;
};

export function withProfile(Wrapped: ComponentType<ProfileHOCInjectedProps>) {
  let ProfilesContainer: React.FC<PropsFromRedux & RouteChildrenProps> = (
    props
  ) => {
    const {
      loading,
      createProfile,
      getCurrentProfile,
      profile,
      location: { pathname },
    } = props;

    const [formData, setFormData] = useState<ProfileDataType>({
      ...createProfileData,
      bio: "",
      status: "",
    });

    useEffect(() => {
      if (profile === null) getCurrentProfile();

      setFormData({ ...formData, ...profile });
    }, [profile]);

    const [isSocialsVisible, setSocialsVisibility] = useState<boolean>(false);

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const isEditPage = pathname.startsWith("/edit");

    const handleSumbit = (e) => {
      e.preventDefault();
      createProfile(formData, history, isEditPage);
    };

    if (loading && isEditPage) return <Spinner />;

    if (!loading && !isEditPage && profile !== null)
      return <Redirect to="/edit-profile" />;

    return (
      <Wrapped
        isSocialsVisible={isSocialsVisible}
        changeSocialsVisibility={setSocialsVisibility}
        profileData={formData}
        handleSumbit={handleSumbit}
        handleChange={handleChange}
        pageHeadingText={isEditPage ? "Edit" : "Create"}
      />
    );
  };

  const mapStateToProps = (state: RootState) => {
    return {
      profile: extractProfileFields(state.profile.profile),
      loading: state.profile.loading,
    };
  };

  const mapDispatchToProps = {
    createProfile,
    getCurrentProfile,
  };

  const connector = connect(mapStateToProps, mapDispatchToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;
  return connector(ProfilesContainer);
}
