import { IUser } from "./../actions/types";
import { PostActionTypes } from "./../actions/post";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: null,
};

interface IState {
  post: IPost;
  posts: Array<IPost>;
  loading: boolean;
  error: null | string;
}

export interface IPost {
  _id: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  likes: Array<IUser>;
  comments: Array<IComment>;
  date: string;
}

export interface IComment {
  _id: string;
  user: string;
  text: string;
  avatar: string;
  date: string;
  name: string;
}

export const postReducer = (
  state: IState = initialState,
  action: PostActionTypes
): IState => {
  switch (action.type) {
    case "GET_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
      };
    case "GET_POST_SUCCESS":
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_POST_SUCEESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        error: null,
      };

    case "ADD_POST_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        error: null,
      };

    case "UPDATE_COMMENT_SUCCESS":
      return {
        ...state,
        error: null,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };

    case "UPDATE_LIKES":
      return {
        ...state,
        posts: state.posts.map((post) =>
          action.payload.id === post._id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        error: null,
      };

    case "POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
