import { combineReducers } from "redux";
import authReducers from "./authReducers";
import blogReducers from "./blogReducers";
import leadsReducers from "./leadsReducers";
import productReducers from "./productReducers";
import referenceReducers from "./referenceReducers";


const rootReducer = combineReducers({
  auth: authReducers,
  blog: blogReducers,
  leads: leadsReducers,
  product: productReducers,
  referenceData: referenceReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;