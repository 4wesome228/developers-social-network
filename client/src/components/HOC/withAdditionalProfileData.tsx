import React, { ComponentType, useState } from "react";

import { createAdditionalProfileData } from "../../utils/additional-profile-fields";

import { connect, ConnectedProps } from "react-redux";
import { addExperience, addEducation } from "../../store/actions/profile";

import { AdditionalHOCInjectedProps } from "./types";
import { RouteChildrenProps } from "react-router-dom";
import { RootState } from "../../store/reducers";

export const withAdditionalProfileData = (
  Wrapped: ComponentType<AdditionalHOCInjectedProps>
) => {
  const createStateFromKeyword = (keyword: string) => {
    return createAdditionalProfileData(keyword);
  };

  let AdditionalProfileContainer;
  AdditionalProfileContainer = (props: PropsFromRedux & RouteChildrenProps) => {
    const {
      isFetching,
      location: { pathname },
      addEducation,
      addExperience,
      history,
    } = props;

    const keyword: "education" | "experience" = pathname.endsWith("education")
      ? "education"
      : "experience";
    const title =
      keyword === "education" ? "Add your education" : "Add your experience";
    const subtitle =
      keyword === "education"
        ? "Add any school, bootcamp, etc that you have attended"
        : " Add any developer/programming positions that you have had in the past";
    const iconClassName =
      keyword === "education" ? "fa-graduation-cap" : "fa-code-branch";

    const state = createStateFromKeyword(keyword);
    const [formData, setFormData] = useState(state);
    const [toDateDisabled, toggleToDate] = useState<boolean>(false);

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      keyword === "experience"
        ? addExperience(formData, history)
        : addEducation(formData, history);
    };

    const renderDateRecord = (
      label: string,
      name: string,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) => {
      return (
        <div className="form-group" key={label}>
          <h4>{label}</h4>
          <input
            type="date"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            disabled={name === "to" && toDateDisabled}
          />
        </div>
      );
    };

    const renderCheckboxRecord = (label: string, name: string) => {
      return (
        <div className="form-group" key={label}>
          <p>
            <input
              type="checkbox"
              name={name}
              checked={formData[name]}
              value={formData[name]}
              onChange={(e) => {
                setFormData({ ...formData, current: !toDateDisabled });
                toggleToDate(!toDateDisabled);
              }}
            />{" "}
            {label}
          </p>
        </div>
      );
    };

    return (
      <Wrapped
        isFetching={isFetching}
        keyword={keyword}
        handleSumbit={onSumbit}
        handleChange={onChange}
        formData={formData}
        renderCheckboxRecord={renderCheckboxRecord}
        renderDateRecord={renderDateRecord}
        title={title}
        subtitle={subtitle}
        iconClassName={iconClassName}
      />
    );
  };

  const mapStateToProps = (state: RootState) => ({
    isFetching: state.profile.isFetching,
  });
  const connector = connect(mapStateToProps, {
    addExperience,
    addEducation,
  });

  type PropsFromRedux = ConnectedProps<typeof connector>;

  return connector(AdditionalProfileContainer);
};
