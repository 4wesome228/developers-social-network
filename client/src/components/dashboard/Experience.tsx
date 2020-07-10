import React from "react";
import Moment from "react-moment";
import { connect, ConnectedProps } from "react-redux";
import { IExperience } from "../../store/reducers/profile";
import { deleteExperience } from "../../store/actions/profile";

type OwnProps = {
  experience: Array<IExperience>;
};

const Experience = ({
  experience,
  deleteExperience,
}: OwnProps & PropsFromRedux) => {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    experiences.length > 0 && (
      <>
        <h2 className="my-2">Experience Information</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </>
    )
  );
};

const connector = connect(null, { deleteExperience });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Experience);
