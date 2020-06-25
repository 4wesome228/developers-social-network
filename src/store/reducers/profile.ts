import { ProfileActionType } from "store/actions/profile";

interface IProfile {
  profile: null | object;
  profiles: [];
  error: string | null;
  loading: boolean;
  isFetching: boolean;
}

const initialState: IProfile = {
  profile: null,
  profiles: [],
  error: null,
  loading: true,
  isFetching: false,
};

export const profileReducer = (
  state: IProfile = initialState,
  action: ProfileActionType
): IProfile => {
  switch (action.type) {
    case "GET_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "GET_PROFILE_SUCCESS":
    case "ADD_EDUCATION_SUCCESS":
    case "ADD_EXPERIENCE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        loading: false,
        isFetching: false,
      };
    case "GET_PROFILE_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
        isFetching: false,
      };
    case "CLEAR_PROFILE":
      return { ...state, profile: null, loading: false };
    case "FETCHING_DATA_REQUEST":
      return { ...state, isFetching: true };
    case "UPDATE_PROFILE_ERROR":
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
