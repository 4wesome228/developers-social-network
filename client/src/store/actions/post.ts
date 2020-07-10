import { createRequestConfig } from "./../../utils/createConfig";
import axios from "axios";
import { IPost, IComment } from "./../reducers/post";
import { thunkSetAlert, ALERT_TYPE } from "./alert";
import { PropertiesTypes, AppThunk } from "./types";

export const getPosts = (): AppThunk<PostActionTypes> => async (dispatch) => {
  try {
    const res = await axios.get<Array<IPost>>("/api/posts");
    dispatch(actions.getPostsSuccess(res.data));
  } catch (error) {
    dispatch(actions.postError(error.response.statusText));
  }
};

export const getPostById = (id): AppThunk<PostActionTypes> => async (
  dispatch,
  getState
) => {
  const { post } = getState().posts;
  if (post && post._id === id) return;
  try {
    dispatch(actions.getPostRequest());
    const res = await axios.get<IPost>(`/api/posts/${id}`);
    dispatch(actions.getPostByIdSuccess(res.data));
  } catch (error) {
    dispatch(thunkSetAlert(error.response.data.msg, ALERT_TYPE.danger));
    dispatch(actions.postError(error.response.statusText));
  }
};

export const updateLikes = (
  postId,
  action: "unlike" | "like"
): AppThunk<PostActionTypes> => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/${action}/${postId}`);
    dispatch(actions.updateLikes(postId, res.data));
  } catch (error) {
    dispatch(thunkSetAlert(error.response.data.msg, ALERT_TYPE.danger));
    dispatch(actions.postError(error.response.statusText));
  }
};

export const deletePost = (postId): AppThunk<PostActionTypes> => async (
  dispatch
) => {
  try {
    const res = await axios.delete<{ msg: string }>(`/api/posts/${postId}`);
    dispatch(actions.deletePostSucces(postId));
    dispatch(thunkSetAlert(res.data.msg, ALERT_TYPE.success));
  } catch (error) {
    dispatch(thunkSetAlert(error.response.data.msg, ALERT_TYPE.danger));
    dispatch(actions.postError(error.response.statusText));
  }
};

export const addPost = (text: string): AppThunk<PostActionTypes> => async (
  dispatch
) => {
  const config = createRequestConfig();
  try {
    const res = await axios.post<IPost>("/api/posts", { text }, config);
    dispatch(actions.addPostSuccess(res.data));
    dispatch(thunkSetAlert("Post was added", ALERT_TYPE.success));
  } catch (error) {
    dispatch(thunkSetAlert(error.response.data.msg, ALERT_TYPE.danger));
    dispatch(actions.postError(error.response.statusText));
  }
};

export const addOrDeleteComment = (
  postId: string,
  commentId: string,
  comment: string,
  toDelete: boolean
): AppThunk<PostActionTypes> => async (dispatch) => {
  const message = toDelete ? "Comment deleted" : "Comment added";
  const config = createRequestConfig();
  try {
    const req = toDelete
      ? axios.delete<Array<IComment>>(
          `/api/posts/comment/${postId}/${commentId}`
        )
      : axios.post<Array<IComment>>(
          `/api/posts/comment/${postId}`,
          { text: comment },
          config
        );
    const res = await req;
    dispatch(actions.updateComment(res.data));

    dispatch(thunkSetAlert(message, ALERT_TYPE.success));
  } catch (error) {
    dispatch(thunkSetAlert(error.response.data.msg, ALERT_TYPE.danger));
    dispatch(actions.postError(error.response.statusText));
  }
};

const actions = {
  updateLikes: (id: string, likes: any) =>
    ({
      type: "UPDATE_LIKES",
      payload: { id, likes },
    } as const),
  postError: (error: string) =>
    ({ type: "POST_FAILURE", payload: error } as const),
  getPostsSuccess: (data: Array<IPost>) =>
    ({
      type: "GET_POSTS_SUCCESS",
      payload: data,
    } as const),
  getPostByIdSuccess: (post: IPost) =>
    ({
      type: "GET_POST_SUCCESS",
      payload: post,
    } as const),
  deletePostSucces: (id: string) =>
    ({ type: "DELETE_POST_SUCEESS", payload: id } as const),
  addPostSuccess: (post: IPost) =>
    ({ type: "ADD_POST_SUCCESS", payload: post } as const),
  updateComment: (comment: Array<IComment>) =>
    ({
      type: "UPDATE_COMMENT_SUCCESS",
      payload: comment,
    } as const),
  getPostRequest: () => ({ type: "GET_POST_REQUEST" } as const),
};

export type PostActionTypes = PropertiesTypes<typeof actions>;
