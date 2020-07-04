import { createRequestConfig } from "./../../utils/createConfig";
import { ProfileDataType } from "./../../utils/create-profile-fields";
import axios from "axios";

import { AppThunk, PropertiesTypes } from "./types";
import { IBaseProfile, IFullProfile } from "../reducers/profile";
import { thunkSetAlert, ALERT_TYPE } from "./alert";

export const getCurrentProfile = (): AppThunk<ProfileActionType> => async (
  dispatch
) => {
  try {
    dispatch(actions.getProfileRequest());

    const res = await axios.get<IBaseProfile>("api/profile/me");

    dispatch(actions.getProfileSuccess(res.data));
  } catch (error) {
    dispatch(actions.getProfileError({ msg: error.response.statusText }));
  }
};

export const getProfileById = (id: string) => async (dispatch) => {
  dispatch(actions.getProfileRequest());
  try {
    const res = await axios.get<IBaseProfile>(`api/profile/user/${id}`);
    dispatch(actions.getProfileSuccess(res.data));
  } catch (error) {
    dispatch(actions.getProfileError({ msg: error.response.statusText }));
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch(actions.getProfileRequest());
    const res = await axios.get<Array<IFullProfile>>("api/profile");
    dispatch(actions.getProfilesSuccess(res.data));
  } catch (error) {
    dispatch(actions.getProfileError({ msg: error.response.statusText }));
  }
};

export const createProfile = (
  profile: ProfileDataType,
  history,
  edit: boolean = false
): AppThunk<ProfileActionType> => async (dispatch) => {
  const config = createRequestConfig();
  dispatch(actions.getProfileRequest());
  try {
    const res = await axios.post<IBaseProfile>("/api/profile", profile, config);
    dispatch(actions.getProfileSuccess(res.data));

    dispatch(
      thunkSetAlert(
        edit ? "Profile updated" : "Profile Created",
        ALERT_TYPE.success
      )
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, ALERT_TYPE.danger));
    });
  }
};

export const addEducation = (education, history) => async (dispatch) => {
  const config = createRequestConfig();

  try {
    dispatch(actions.fetchingDataRequest());
    const res = await axios.put<IBaseProfile>(
      "/api/profile/education",
      education,
      config
    );
    dispatch(actions.addEducationSuccess(res.data));

    dispatch(thunkSetAlert("Education Added", ALERT_TYPE.success));
    history.push("/dashboard");
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    if (!errors) {
      dispatch(thunkSetAlert(error.message, ALERT_TYPE.danger));
      return;
    }
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, ALERT_TYPE.danger));
    });
  }
};

export const addExperience = (experience, history) => async (dispatch) => {
  const config = createRequestConfig();

  try {
    dispatch(actions.fetchingDataRequest());
    const res = await axios.put<IBaseProfile>(
      "/api/profile/experience",
      experience,
      config
    );
    dispatch(actions.addExperienceSuccess(res.data));

    dispatch(thunkSetAlert("Experience Added", ALERT_TYPE.success));
    history.push("/dashboard");
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    if (!errors) {
      dispatch(thunkSetAlert(error.message, ALERT_TYPE.danger));
      return;
    }
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, ALERT_TYPE.danger));
    });
  }
};

export const deleteExperience = (id: string) => async (dispatch) => {
  try {
    const res = await axios.delete<IBaseProfile>(
      `/api/profile/experience/${id}`
    );
    dispatch(actions.deleteExperienceSuccess(res.data));
    dispatch(thunkSetAlert("Experience Removed", ALERT_TYPE.success));
  } catch (error) {
    dispatch(actions.updateProfileFail(error.message));
  }
};

export const deleteEducation = (id: string) => async (dispatch) => {
  try {
    const res = await axios.delete<IBaseProfile>(
      `/api/profile/education/${id}`
    );
    dispatch(actions.deleteEducationSuccess(res.data));
    dispatch(thunkSetAlert("Education Removed", ALERT_TYPE.success));
  } catch (error) {
    dispatch(actions.updateProfileFail(error.message));
  }
};

//to create universal action UPDATE PROFILE
const actions = {
  getProfileRequest: () => ({ type: "GET_PROFILE_REQUEST" } as const),
  getProfileSuccess: (profileInfo: IBaseProfile) =>
    ({ type: "GET_PROFILE_SUCCESS", payload: profileInfo } as const),
  getProfilesSuccess: (profileInfo: Array<IFullProfile>) =>
    ({ type: "GET_PROFILES_SUCCESS", payload: profileInfo } as const),
  getProfileError: (error) =>
    ({ type: "GET_PROFILE_ERROR", payload: error } as const),
  clearProfile: () => ({ type: "CLEAR_PROFILE" } as const),
  addEducationSuccess: (profile: IBaseProfile) =>
    ({ type: "ADD_EDUCATION_SUCCESS", payload: profile } as const),
  addExperienceSuccess: (profile: IBaseProfile) =>
    ({ type: "ADD_EXPERIENCE_SUCCESS", payload: profile } as const),
  deleteExperienceSuccess: (profile: IBaseProfile) =>
    ({ type: "DELETE_EXPERIENCE_SUCCESS", payload: profile } as const),
  deleteEducationSuccess: (profile: IBaseProfile) =>
    ({ type: "DELETE_EDUCATION_SUCCESS", payload: profile } as const),
  updateProfileFail: (error) =>
    ({ type: "UPDATE_PROFILE_ERROR", payload: error } as const),
  fetchingDataRequest: () => ({ type: "FETCHING_DATA_REQUEST" } as const),
};

export const clearProfile = actions.clearProfile;
export type ProfileActionType = PropertiesTypes<typeof actions>;
