import { combineReducers } from "redux";
import authReducers from "./authReducers";
import blogReducers from "./blogReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  blog: blogReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;