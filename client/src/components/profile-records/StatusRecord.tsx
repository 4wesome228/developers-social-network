import React from "react";
import { StatusRecordProps } from "./types";

export default (props: StatusRecordProps) => {
  const { onChange, value } = props;
  return (
    <div className="form-group">
      <select
        name="status"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      >
        <option value="0">* Select Professional Status</option>
        <option value="Developer">Developer</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Senior Developer">Senior Developer</option>
        <option value="Manager">Manager</option>
        <option value="Student or Learning">Student or Learning</option>
        <option value="Instructor">Instructor or Teacher</option>
        <option value="Intern">Intern</option>
        <option value="Other">Other</option>
      </select>
      <small className="form-text">
        Give us an idea of where you are at in your career
      </small>
    </div>
  );
};
