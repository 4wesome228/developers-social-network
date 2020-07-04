import React from "react";
import Moment from "react-moment";

import { IExperience } from "../../store/reducers/profile";

type Props = {
  experience: IExperience;
};
export default ({
  experience: { company, title, description, from, to },
}: Props) => {
  return (
    <div>
      <h3 className="text-dar">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};
