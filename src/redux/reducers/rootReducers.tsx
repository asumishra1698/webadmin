import { combineReducers } from "redux";
import authReducers from "./authReducers";
import blogReducers from "./blogReducers";
import leadsReducers from "./leadsReducers";
import productReducers from "./productReducers";


const rootReducer = combineReducers({
  auth: authReducers,
  blog: blogReducers,
  leads: leadsReducers,
  product: productReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;