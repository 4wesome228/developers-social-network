import React from "react";
import Moment from "react-moment";

import { IEducation } from "../../store/reducers/profile";

type Props = {
  education: IEducation;
};
export default ({
  education: { degree, description, fieldofstudy, from, school, to },
}: Props) => {
  return (
    <div>
      <h3 className="text-dar">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Field of study:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};
