import { alertReducer } from "./alert";
import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";
import { postReducer } from "./post";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  posts: postReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
