import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteChildrenProps, Link } from "react-router-dom";

import { getPostById, addOrDeleteComment } from "../../store/actions/post";
import { RootState } from "../../store/reducers";

import Spinner from "../spinner/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post: React.FC<Props> = ({
  getPostById,
  loading,
  post,
  match,
  error,
  auth,
  addOrDeleteComment,
}) => {
  const postId = match.params.id;

  useEffect(() => {
    getPostById(postId);
  }, [getPostById]);

  const onDeleteComment = (postId, commentId) => {
    addOrDeleteComment(postId, commentId, null, true);
  };

  const onAddComment = (postId, comment) => {
    addOrDeleteComment(postId, null, comment, false);
  };

  if ((loading || post === null) && !error) return <Spinner />;

  return (
    <>
      <Link to={"/posts"} className="btn btn-light">
        Back to posts
      </Link>
      {error ? (
        <p className="lead">There is no such post...</p>
      ) : (
        <>
          <PostItem post={post} showDeleteBtn={false} hideActions />
          <CommentForm postId={postId} onAddComment={onAddComment} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                isShow={
                  !auth.loading && auth.user && auth.user._id === comment.user
                }
                onDeleteComment={onDeleteComment}
                key={comment._id}
                postId={postId}
                comment={comment}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  post: state.posts.post,
  loading: state.posts.loading,
  error: state.posts.error,
  auth: state.auth,
});

const connector = connect(mapStateToProps, { getPostById, addOrDeleteComment });
type Props = ConnectedProps<typeof connector> &
  RouteChildrenProps<{ id: string }>;
export default connector(Post);
