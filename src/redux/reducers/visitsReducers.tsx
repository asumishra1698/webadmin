import {
  FETCH_VISITS_REQUEST,
  FETCH_VISITS_SUCCESS,
  FETCH_VISITS_FAILURE,
  FETCH_VISIT_HISTORY_REQUEST,
  FETCH_VISIT_HISTORY_SUCCESS,
  FETCH_VISIT_HISTORY_FAILURE,
} from "../actions/actionTypes";

export interface Visit {
  _id: string;
  visitor_id: any;
  project_id: any;
  visit_datetime: string;
  status: string;
  remarks: string;
  visit_photo_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialState: {
  visits: Visit[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  visitHistory: any[];
} = {
  visits: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,
  visitHistory: [],
  
};

const visitsReducer = (state = initialState, action: any): typeof initialState => {
  switch (action.type) {
    case FETCH_VISITS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VISITS_SUCCESS:
      return {
        ...state,
        visits: action.payload.data.data,
        total: action.payload.data.total,
        page: action.payload.data.page,
        limit: action.payload.data.limit,
        isLoading: false,
        error: null,
      };
    case FETCH_VISITS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_VISIT_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VISIT_HISTORY_SUCCESS:
      return {
        ...state,
        visitHistory: action.payload.data,
        isLoading: false,
        error: null,
      };
    case FETCH_VISIT_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default visitsReducer;