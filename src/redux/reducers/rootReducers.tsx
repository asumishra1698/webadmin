import { combineReducers } from "redux";
import authReducers from "./authReducers";
import blogReducers from "./blogReducers";
import leadsReducers from "./leadsReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  blog: blogReducers,
  leads: leadsReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;