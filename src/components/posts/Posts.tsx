import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import Spinner from "../spinner/Spinner";
import PostItem from "./PostItem";

import { getPosts, updateLikes, deletePost } from "../../store/actions/post";
import { RootState } from "../../store/reducers";
import PostForm from "./PostForm";

const Posts: React.FC<PropsFromRedux> = ({
  getPosts,
  loading,
  posts,
  auth,
  updateLikes,
  deletePost,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleLikeChange = (id: string, action: "like" | "unlike") => {
    updateLikes(id, action);
  };
  const handlePostDelete = (id: string) => {
    deletePost(id);
  };

  if (loading && posts.length === 0) return <Spinner />;
  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to community
      </p>
      <PostForm />
      <div className="posts">
        {posts.length > 0 &&
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              showDeleteBtn={
                !auth.loading && auth.user && auth.user._id === post.user
              }
              handleLikeChange={handleLikeChange}
              handlePostDelete={handlePostDelete}
              hideActions={false}
            />
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  auth: state.auth,
});

const connector = connect(mapStateToProps, {
  getPosts,
  updateLikes,
  deletePost,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Posts);
