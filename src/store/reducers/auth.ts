import {
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
  ActionTypes,
} from "./../actions/types";

interface IAuthState {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  token: string;
  user: null;
}

const initialState: IAuthState = {
  isAuth: false,
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  user: null,
};

export const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_REGISTER_REQUEST:
      return { ...state, loading: true };
    case FETCH_REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload);
      return { ...state, isAuth: true, loading: false, token: action.payload };
    case FETCH_REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
