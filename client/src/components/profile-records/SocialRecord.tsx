import React from "react";
import { ProfileSocialRecordProps } from "./types";

export default (props: ProfileSocialRecordProps) => {
  const { name, onRecordChange, placeholder, value } = props;

  return (
    <div className="form-group social-input">
      <i className={`fab fa-${name} fa-2x`}></i>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onRecordChange}
      />
    </div>
  );
};
