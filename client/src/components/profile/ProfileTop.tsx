import React from "react";
import { IBaseProfile } from "../../store/reducers/profile";

type Props = {
  profile: IBaseProfile;
};

export default ({
  profile: {
    user: { name, avatar },
    company,
    status,
    social,
    website,
  },
}: Props) => {
  const socialLinks =
    social && Object.values(social).length > 0
      ? Object.entries(social).reduce((acc, [name, link]) => {
          const item = (
            <a href={link} key={name + link} target="_blank">
              <i className={`fab fa-${name} fa-2x`}></i>
            </a>
          );
          return [...acc, item];
        }, [])
      : [];
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="avatar-image" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>location</span>}</p>
      {website && (
        <div className="icons my-1">
          <a href={website} target="_blank">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        </div>
      )}
      {socialLinks.length > 0 && (
        <div className="icons my-1">{socialLinks}</div>
      )}
    </div>
  );
};
