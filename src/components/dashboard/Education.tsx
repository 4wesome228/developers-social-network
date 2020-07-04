import React from "react";
import Moment from "react-moment";
import { IEducation } from "../../store/reducers/profile";
import { connect, ConnectedProps } from "react-redux";
import { deleteEducation } from "../../store/actions/profile";

type OwnProps = {
  education: Array<IEducation>;
};

const Education = ({
  education,
  deleteEducation,
}: OwnProps & PropsFromRedux) => {
  const educations = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    educations.length > 0 && (
      <>
        <h2 className="my-2">Education Information</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </>
    )
  );
};

const connector = connect(null, { deleteEducation });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Education);
