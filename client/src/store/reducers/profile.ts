import { ProfileActionType } from "store/actions/profile";
import { IUser } from "store/actions/types";

export type IProfileMeData = BaseProfile<IBaseProfile>;
type BaseProfile<T> = T extends IBaseProfile ? { me: IBaseProfile } : never;

export interface IBaseProfile {
  _id: string;
  company: string;
  status: string;
  website: string;
  location: string;
  bio: string;
  social: ISocial;
  experience: Array<IExperience>;
  education: Array<IEducation>;
  skills: Array<string>;
  date: Date;
  user: IUser;
}

export interface IFullProfile extends IBaseProfile {}

export interface IExperience {
  current: boolean;
  _id: string;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
}

export interface IEducation {
  current: boolean;
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  description: string;
}

interface IProfile {
  profile: null | IFullProfile | IBaseProfile;
  profiles: Array<IFullProfile>;
  error: string | null;
  loading: boolean;
  isFetching: boolean;
}

interface ISocial {
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
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
    case "GET_PROFILES_SUCCESS":
      return { ...state, profiles: action.payload, loading: false };
    case "GET_PROFILE_SUCCESS":
    case "ADD_EDUCATION_SUCCESS":
    case "ADD_EXPERIENCE_SUCCESS":
    case "DELETE_EDUCATION_SUCCESS":
    case "DELETE_EXPERIENCE_SUCCESS":
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
