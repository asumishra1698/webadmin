import {
  GET_LEAD_REQUEST,
  GET_LEAD_SUCCESS,
  GET_LEAD_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
} from "../actions/actionTypes";

interface Lead {
  _id: string;
  name: string;
  number: string;
  email: string;
  message: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface LeadsState {
  leads: Lead[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  pagination: null,
  loading: false,
  error: null,
};

const leadsReducer = (state = initialState, action: any): LeadsState => {
  switch (action.type) {
    case GET_LEAD_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_LEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        leads: action.payload.contacts,
        pagination: action.payload.pagination,
        error: null,
      };
    case GET_LEAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_LEAD_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_LEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
        error: null,
      };
    case DELETE_LEAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default leadsReducer;
