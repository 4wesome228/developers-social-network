import { ProfileDataType } from "./../../utils/create-profile-fields";
import { AppThunk, PropertiesTypes, IProfileData } from "./types";
import axios from "axios";
import { thunkSetAlert } from "./alert";

export const getCurrentProfile = (): AppThunk<ProfileActionType> => async (
  dispatch
) => {
  try {
    dispatch(actions.getProfileRequest());

    const res = await axios.get<IProfileData>("api/profile/me");

    dispatch(actions.getProfileSuccess(res.data.me));
  } catch (error) {
    dispatch(actions.getProfileError({ msg: error.response.statusText }));
  }
};

export const createProfile = (
  profile: ProfileDataType,
  history,
  edit: boolean = false
): AppThunk<ProfileActionType> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post<IProfileData>("/api/profile", profile, config);
    dispatch(actions.getProfileSuccess(res.data));

    dispatch(
      thunkSetAlert(edit ? "Profile updated" : "Profile Created", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });
  }
};

export const addEducation = (education, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(actions.fetchingDataRequest());
    const res = await axios.put<IProfileData>(
      "/api/profile/education",
      education,
      config
    );
    dispatch(actions.addEducationSuccess(res.data));

    dispatch(thunkSetAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    if (!errors) {
      dispatch(thunkSetAlert(error.message, "danger"));
      return;
    }
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });
  }
};

export const addExperience = (experience, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(actions.fetchingDataRequest());
    const res = await axios.put<IProfileData>(
      "/api/profile/experience",
      experience,
      config
    );
    dispatch(actions.addExperienceSuccess(res.data));

    dispatch(thunkSetAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    dispatch(actions.updateProfileFail(error.response));
    const errors = error.response.data.errors;
    if (!errors) {
      dispatch(thunkSetAlert(error.message, "danger"));
      return;
    }
    errors.forEach((error) => {
      dispatch(thunkSetAlert(error.msg, "danger"));
    });
  }
};

const actions = {
  getProfileRequest: () => ({ type: "GET_PROFILE_REQUEST" } as const),
  getProfileSuccess: (profileInfo: object) =>
    ({ type: "GET_PROFILE_SUCCESS", payload: profileInfo } as const),
  getProfileError: (error) =>
    ({ type: "GET_PROFILE_ERROR", payload: error } as const),
  clearProfile: () => ({ type: "CLEAR_PROFILE" } as const),
  addEducationSuccess: (education) =>
    ({ type: "ADD_EDUCATION_SUCCESS", payload: education } as const),
  addExperienceSuccess: (experience) =>
    ({ type: "ADD_EXPERIENCE_SUCCESS", payload: experience } as const),
  updateProfileFail: (error) =>
    ({ type: "UPDATE_PROFILE_ERROR", payload: error } as const),
  fetchingDataRequest: () => ({ type: "FETCHING_DATA_REQUEST" } as const),
};

export const clearProfile = actions.clearProfile;
export type ProfileActionType = PropertiesTypes<typeof actions>;
