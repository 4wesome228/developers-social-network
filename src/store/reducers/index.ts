import { alertReducer } from "./alert";
import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
