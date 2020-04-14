import { alertReducer } from "./alert";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  alerts: alertReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
