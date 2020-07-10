import React from "react";
import { IBaseProfile } from "../../store/reducers/profile";

type Props = {
  profile: IBaseProfile;
};
export default ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}: Props) => {
  const skillsFields =
    skills.length > 0 &&
    skills.map((skill, idx) => (
      <div className="p-1" key={idx}>
        <i className="fa fa-check"></i>
        {skill}
      </div>
    ));

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">{name.trim().split(" ")[0]} bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </>
      )}
      {skillsFields.length > 0 && (
        <>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">{skillsFields}</div>
        </>
      )}
    </div>
  );
};
