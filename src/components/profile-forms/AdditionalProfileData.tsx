import React from "react";

import ProfileRecord from "../profile-records/ProfileRecord";
import additionalProfileFields from "../../utils/additional-profile-fields";

import { withAdditionalProfileData } from "../HOC/withAdditionalProfileData";
import { Link } from "react-router-dom";
import { AdditionalHOCInjectedProps } from "../HOC/types";
import { IAdditionalProfileField } from "./types";
import Spinner from "../spinner/Spinner";

const AdditionalProfileData = (props: AdditionalHOCInjectedProps) => {
  const {
    isFetching,
    keyword,
    formData,
    handleChange,
    handleSumbit,
    renderDateRecord,
    renderCheckboxRecord,
    title,
    subtitle,
    iconClassName,
  } = props;

  const profileInputData = additionalProfileFields[keyword];
  const profileFields = Object.values(profileInputData).map(
    (field: IAdditionalProfileField) => {
      switch (field.type) {
        case "text":
        case "textarea":
          return (
            <ProfileRecord
              key={field.name}
              name={field.name}
              tag={field.tag || "input"}
              onRecordChange={handleChange}
              placeholder={field.placeholder}
              value={formData[field.name]}
            />
          );
        case "date":
          return renderDateRecord(field.label, field.name, handleChange);
        case "checkbox":
          return renderCheckboxRecord(field.label, field.name);
      }
    }
  );

  return (
    <>
      <h1 className="large text-primary">{title}</h1>
      <p className="lead">
        <i className={`fas ${iconClassName}`}></i> {subtitle}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSumbit(e)}>
        {profileFields}

        {isFetching ? (
          <Spinner />
        ) : (
          <input type="submit" className="btn btn-primary my-1" />
        )}

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default withAdditionalProfileData(AdditionalProfileData);
