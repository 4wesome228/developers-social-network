import { IUser } from "./../actions/types";
import { AuthActionTypes } from "store/actions/auth";

interface IAuthState {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  token: string;
  user: null | IUser;
}

const initialState: IAuthState = {
  isAuth: false,
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case "FETCH_REGISTER_REQUEST":
    case "FETCH_LOGIN_REGUEST":
      return { ...state, loading: true };
    case "FETCH_REGISTER_SUCCESS":
    case "FETCH_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload);
      return { ...state, isAuth: true, loading: false, token: action.payload };
    case "FETCH_REGISTER_FAILURE":
    case "FETCH_LOGIN_FAILURE":
    case "USER_LOAD_FAILURE":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuth: false, loading: false, token: null };
    case "USER_LOADED":
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
