import { combineReducers } from "redux";
import authReducers from "./authReducers";
import blogReducers from "./blogReducers";
import leadsReducers from "./leadsReducers";
import productReducers from "./productReducers";
import referenceReducers from "./referenceReducers";
import projectReducers from "./projectReducers";
import brokersReducers from "./brokerReducers";
import salesRmReducers from "./salesRmReducers";


const rootReducer = combineReducers({
  auth: authReducers,
  blog: blogReducers,
  leads: leadsReducers,
  product: productReducers,
  referenceData: referenceReducers,
  projects: projectReducers,
  brokers: brokersReducers,
  salesRms: salesRmReducers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;