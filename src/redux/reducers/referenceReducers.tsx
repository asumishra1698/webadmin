import {
  GET_REFERENCE_DATA_REQUEST,
  GET_REFERENCE_DATA_SUCCESS,
  GET_REFERENCE_DATA_FAILURE,
  ADD_REFERENCE_DATA_ITEM_REQUEST,
  ADD_REFERENCE_DATA_ITEM_SUCCESS,
  ADD_REFERENCE_DATA_ITEM_FAILURE,
  GETWITHOUT_ADMIN_REFERENCE_DATA_REQUEST,
  GETWITHOUT_ADMIN_REFERENCE_DATA_SUCCESS,
  GETWITHOUT_ADMIN_REFERENCE_DATA_FAILURE,
  REMOVE_REFERENCE_DATA_ITEM_REQUEST,
  REMOVE_REFERENCE_DATA_ITEM_SUCCESS,
  REMOVE_REFERENCE_DATA_ITEM_FAILURE,
  UPDATE_REFERENCE_DATA_ITEM_REQUEST,
  UPDATE_REFERENCE_DATA_ITEM_SUCCESS,
  UPDATE_REFERENCE_DATA_ITEM_FAILURE,
} from "../actions/actionTypes";

interface ReferenceDataState {
  data: {
    data: any[];
    total?: number;
    page?: number;
    limit?: number;
  } | null;
  loading: boolean;
  error: string | null;
  withoutAdminReferenceData: any;
  salesRMs?: any[];
}

const initialState: ReferenceDataState = {
  data: null,
  loading: false,
  error: null,
  withoutAdminReferenceData: null,
  salesRMs: [],
};

const referenceDataReducer = (
  state = initialState,
  action: any
): ReferenceDataState => {
  switch (action.type) {
    case GET_REFERENCE_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_REFERENCE_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_REFERENCE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_REFERENCE_DATA_ITEM_SUCCESS:
      if (!state.data || !Array.isArray(state.data.data)) {
        return {
          ...state,
          loading: false,
          data: { data: [action.payload] },
        };
      }
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: [...state.data.data, action.payload],
        },
      };

    case REMOVE_REFERENCE_DATA_ITEM_SUCCESS:
      if (!state.data || !Array.isArray(state.data.data)) {
        return state;
      }
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: state.data.data.filter((item) => item._id !== action.payload),
        },
      };

    case ADD_REFERENCE_DATA_ITEM_REQUEST:
    case REMOVE_REFERENCE_DATA_ITEM_REQUEST:
      return { ...state, loading: true };

    case ADD_REFERENCE_DATA_ITEM_FAILURE:
    case REMOVE_REFERENCE_DATA_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GETWITHOUT_ADMIN_REFERENCE_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case GETWITHOUT_ADMIN_REFERENCE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        withoutAdminReferenceData: action.payload,
      };
    case GETWITHOUT_ADMIN_REFERENCE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_REFERENCE_DATA_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_REFERENCE_DATA_ITEM_SUCCESS:
      if (!state.data || !Array.isArray(state.data.data)) {
        return state;
      }
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: state.data.data.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        },
      };
    case UPDATE_REFERENCE_DATA_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };    

    default:
      return state;
  }
};

export default referenceDataReducer;