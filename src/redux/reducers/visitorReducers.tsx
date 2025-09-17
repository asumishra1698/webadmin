import {
  FETCH_VISITORS_REQUEST,
  FETCH_VISITORS_SUCCESS,
  FETCH_VISITORS_FAILURE,
  FETCH_VISITOR_BY_ID_REQUEST,
  FETCH_VISITOR_BY_ID_SUCCESS,
  FETCH_VISITOR_BY_ID_FAILURE,
  FETCH_VISITOR_HISTORY_REQUEST,
  FETCH_VISITOR_HISTORY_SUCCESS,
  FETCH_VISITOR_HISTORY_FAILURE,
  EXPORT_VISITOR_DATA_REQUEST,
  EXPORT_VISITOR_DATA_SUCCESS,
  EXPORT_VISITOR_DATA_FAILURE,
  UPDATE_VISITOR_REQUEST,
  UPDATE_VISITOR_SUCCESS,
  UPDATE_VISITOR_FAILURE,
  VISITOR_TAG_HISTORY_REQUEST,
  VISITOR_TAG_HISTORY_SUCCESS,
  VISITOR_TAG_HISTORY_FAILURE,
} from "../actions/actionTypes";

export interface Visitor {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  visitor_photo_url: string;
  source_type_id: {
    metadata: {
      color: string;
      icon: string;
    };
    _id: string;
    category: string;
    key: string;
    name: string;
    description: string;
    order: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialState = {
  visitors: [],
  currentVisitor: null,
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,
  visitorHistory: [],
  exportedVisitorData: null,
  visitorTagHistory: [],
};

const visitorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_VISITORS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VISITORS_SUCCESS:
      return {
        ...state,
        visitors: action.payload.data.data,
        total: action.payload.data.total,
        page: action.payload.data.page,
        limit: action.payload.data.limit,
        isLoading: false,
        error: null,
      };
    case FETCH_VISITORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_VISITOR_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VISITOR_BY_ID_SUCCESS:
      return {
        ...state,
        currentVisitor: action.payload.data,
        isLoading: false,
        error: null,
      };
    case FETCH_VISITOR_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case FETCH_VISITOR_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VISITOR_HISTORY_SUCCESS:
      return {
        ...state,
        visitorHistory: action.payload.data.data,
        pagination: {
          total: action.payload.data.total,
          page: action.payload.data.page,
          limit: action.payload.data.limit,
          totalPages: action.payload.data.totalPages,
        },
        isLoading: false,
        error: null,
      };
    case FETCH_VISITOR_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    
      case "CLEAR_VISITOR_DATA":
      return {
        ...state,
        currentVisitor: null,
        // visitorHistory: [],
        visitorTagHistory: [],
      };

    case EXPORT_VISITOR_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EXPORT_VISITOR_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        exportedVisitorData: action.payload,
      };
    case EXPORT_VISITOR_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        exportedVisitorData: null,
      };
    case UPDATE_VISITOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_VISITOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentVisitor: action.payload,
      };
    case UPDATE_VISITOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case VISITOR_TAG_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case VISITOR_TAG_HISTORY_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        visitorTagHistory: action.payload.data || [],
        pagination: {
          total: action.payload.data.total,
          page: action.payload.data.page,
          limit: action.payload.data.limit,
          totalPages: action.payload.data.totalPages,
        },
        isLoading: false,
        error: null,
      };
    case VISITOR_TAG_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default visitorReducer;