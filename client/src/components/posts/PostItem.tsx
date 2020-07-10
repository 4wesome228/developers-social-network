import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { IPost } from "../../store/reducers/post";

type Props = {
  post: IPost;
  showDeleteBtn: boolean;
  handleLikeChange?: (id: string, action: string) => void;
  handlePostDelete?: (id: string) => void;
  hideActions?: boolean;
};

const PostItem: React.FC<Props> = ({
  post: { user, _id, avatar, comments, date, likes, name, text },
  showDeleteBtn,
  handleLikeChange,
  handlePostDelete,
  hideActions,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar-image" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!hideActions && (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleLikeChange(_id, "like")}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleLikeChange(_id, "unlike")}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {showDeleteBtn && (
              <button
                className="btn btn-danger"
                onClick={() => handlePostDelete(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
