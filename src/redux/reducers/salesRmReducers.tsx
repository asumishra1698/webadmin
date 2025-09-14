import {
  GET_SALES_RM_REQUEST,
  GET_SALES_RM_SUCCESS,
  GET_SALES_RM_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  salesRms: [],
  loading: false,
  error: null,
};

const salesRmReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SALES_RM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SALES_RM_SUCCESS:
      return {
        ...state,
        loading: false,
        salesRms: action.payload,
        error: null,
      };
    case GET_SALES_RM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default salesRmReducer;