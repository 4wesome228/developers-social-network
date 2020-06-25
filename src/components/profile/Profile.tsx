import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { FIELDS_TYPES, IProfileField } from "./types";
import {
  createProfileFields,
  ProfileDataType,
} from "../../utils/create-profile-fields";

import StatusRecord from "../profile-records/StatusRecord";
import SocialRecord from "../profile-records/SocialRecord";
import ProfileRecord from "../profile-records/ProfileRecord";
import { withProfile } from "../HOC/withProfile";

type Props = {
  isSocialsVisible: boolean;
  changeSocialsVisibility: Dispatch<SetStateAction<boolean>>;
  profileData: ProfileDataType;
  handleSumbit: (e: any) => void;
  handleChange: (e: any) => void;
  pageHeadingText: string;
};

const Profile = (props: Props) => {
  const {
    handleChange,
    handleSumbit,
    changeSocialsVisibility,
    isSocialsVisible,
    profileData,
    pageHeadingText,
  } = props;

  const renderFields = (
    config: Array<IProfileField>,
    type: FIELDS_TYPES,
    onChange: typeof handleChange
  ): React.ReactNode[] => {
    return type === 1
      ? config.map((field) => (
          <ProfileRecord
            key={field.name}
            {...field}
            description={field.description}
            onRecordChange={onChange}
            value={profileData[field.name]}
            tag={field.tag || "input"}
          />
        ))
      : config.map((field) => (
          <SocialRecord
            key={field.name}
            {...field}
            onRecordChange={onChange}
            value={profileData[field.name]}
          />
        ));
  };

  const { socials, fields } = createProfileFields;

  const profileInputFields = renderFields(
    Object.values(fields),
    FIELDS_TYPES.fields,
    handleChange
  );

  const socialFields = renderFields(
    Object.values(socials),
    FIELDS_TYPES.socials,
    handleChange
  );

  return (
    <>
      <h1 className="large text-primary">{pageHeadingText} your profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSumbit}>
        <StatusRecord value={profileData.status} onChange={handleChange} />

        {profileInputFields}

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => changeSocialsVisibility(!isSocialsVisible)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {isSocialsVisible && socialFields}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default withProfile(Profile);
