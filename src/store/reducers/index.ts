import { alertReducer } from "./alert";
import { combineReducers } from "redux";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
