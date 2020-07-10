import React from "react";
import { ProfileRecordProps } from "./types";

export default (props: ProfileRecordProps) => {
  const { description, name, placeholder, onRecordChange, value, tag } = props;

  return (
    <div className="form-group">
      {tag === "input" ? (
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onRecordChange}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onRecordChange}
        ></textarea>
      )}

      {description && <small className="form-text">{description}</small>}
    </div>
  );
};
