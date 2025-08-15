import { combineReducers } from "redux";
import authReducers from "./authReducers";

const rootReducer = combineReducers({
  auth: authReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;