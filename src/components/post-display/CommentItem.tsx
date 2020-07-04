import React from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import { IComment } from "../../store/reducers/post";

type Props = {
  comment: IComment;
  postId: string;
  isShow: boolean;
  onDeleteComment: (commentId: string, postId: string) => void;
};

const CommentItem: React.FC<Props> = ({
  comment: { _id, avatar, date, text, user, name },
  postId,
  isShow,
  onDeleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={user}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {isShow && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeleteComment(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
