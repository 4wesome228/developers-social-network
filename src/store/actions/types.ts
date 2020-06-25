import { RootState } from "store/reducers";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export interface IProfileData {
  me: {
    company: string;
    status: string;
    website: string;
    location: string;
    skills: string;
    bio: string;
    githubusername: string;
    social: ISocial;
    experience: Array<IExperience>;
    education: Array<IEducation>;
    date: Date;
  };
}

interface ISocial {
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

interface IExperience {
  title: string;
  company: string;
  current: boolean;
  from: Date;
  description: string;
}

interface IEducation {
  school: string;
  degree: string;
  current: boolean;
  from: Date;
  fieldofstudy: string;
}

export interface IAlert {
  id: string;
  msg: string;
  alertType: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterToken {
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  date: typeof Date;
}

export type AppThunk<T extends Action> = ThunkAction<
  void,
  RootState,
  unknown,
  T
>;
export type PropertiesTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer R;
}
  ? R
  : never;
