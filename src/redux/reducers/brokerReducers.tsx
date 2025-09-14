import {
  // ========================
  // BROKER REDUCERS
  // ========================

  GET_BROKERS_REQUEST,
  GET_BROKERS_SUCCESS,
  GET_BROKERS_FAILURE,
  CREATE_BROKER_REQUEST,
  CREATE_BROKER_SUCCESS,
  CREATE_BROKER_FAILURE,
  GET_BROKER_BY_ID_REQUEST,
  GET_BROKER_BY_ID_SUCCESS,
  GET_BROKER_BY_ID_FAILURE,
  UPDATE_BROKER_REQUEST,
  UPDATE_BROKER_SUCCESS,
  UPDATE_BROKER_FAILURE,
  APPROVE_BROKER_REQUEST,
  APPROVE_BROKER_SUCCESS,
  APPROVE_BROKER_FAILURE,
  REJECT_BROKER_REQUEST,
  REJECT_BROKER_SUCCESS,
  REJECT_BROKER_FAILURE,
  EXPORT_BROKER_DATA_REQUEST,
  EXPORT_BROKER_DATA_SUCCESS,
  EXPORT_BROKER_DATA_FAILURE,
  DELETE_BROKER_REQUEST,
  DELETE_BROKER_SUCCESS,
  DELETE_BROKER_FAILURE,
  REFERED_VISITORS_BY_BROKER_REQUEST,
  REFERED_VISITORS_BY_BROKER_SUCCESS,
  REFERED_VISITORS_BY_BROKER_FAILURE,

  // ========================
  // BROKER TEAM REDUCERS
  // ========================
  GET_BROKER_TEAM_REQUEST,
  GET_BROKER_TEAM_SUCCESS,
  GET_BROKER_TEAM_FAILURE,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,

  // ========================
  // BROKER KPI REDUCERS
  // ========================
  GET_BROKER_KPI_REQUEST,
  GET_BROKER_KPI_SUCCESS,
  GET_BROKER_KPI_FAILURE,
} from "../actions/actionTypes";
interface BrokerDocument {
  _id: string;
  type: string;
  url: string;
  name: string;
}
interface Broker {
  _id: string;
  broker_code: string;
  broker_name: string;
  company_name: string;
  owner_name: string;
  mobile_number: string;
  alt_mobile_number?: string;
  email_address: string;
  alt_email_address?: string;
  website_url?: string;
  status: string;
  rere_number: string;
  profile_picture?: string;
  createdAt: string;
  company_type: {
    _id: string;
    name: string;
    category: string;
  };
  sales_rm_id?: string;
  office_address: {
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  totalPages: number;
  documents: BrokerDocument[];
  visitor_count?: number;
}

interface BrokerKPIs {
  totals: {
    total_visitors: number;
    active_tags: number;
    expired_tags: number;
  };
  deltas_vs_last_month: {
    total_visitors_pct: number;
    active_tags_pct: number;
    expired_tags_pct: number;
  };
  month_counters: {
    current_month: {
      unique_visitors: number;
      active_created: number;
      expired_created: number;
    };
    previous_month: {
      unique_visitors: number;
      active_created: number;
      expired_created: number;
    };
  };
}

interface BrokerState {
  brokers: Broker[];
  selectedBroker: Broker | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  exportedBrokerData?: Blob | null;
  referredVisitors?: any[];
  brokerTeam?: any[];
  team: any[];
  kpi: BrokerKPIs | null;
}

const initialState: BrokerState = {
  brokers: [],
  selectedBroker: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  referredVisitors: [],
  team: [],
  kpi: null,
};

const brokerReducer = (state = initialState, action: any): BrokerState => {
  switch (action.type) {
    case GET_BROKERS_REQUEST:
    case CREATE_BROKER_REQUEST:
    case GET_BROKER_BY_ID_REQUEST:
    case UPDATE_BROKER_REQUEST:
    case APPROVE_BROKER_REQUEST:
    case REJECT_BROKER_REQUEST:
    case DELETE_BROKER_REQUEST:
    case REFERED_VISITORS_BY_BROKER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BROKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        brokers: action.payload.data,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case GET_BROKER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBroker: action.payload,
        error: null,
      };
    case CREATE_BROKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_BROKER_SUCCESS:
    case APPROVE_BROKER_SUCCESS:
    case REJECT_BROKER_SUCCESS:
      const updatedBroker = action.payload;
      return {
        ...state,
        loading: false,
        brokers: state.brokers.map((broker) =>
          broker._id === updatedBroker._id ? updatedBroker : broker
        ),
        selectedBroker:
          state.selectedBroker?._id === updatedBroker._id
            ? updatedBroker
            : state.selectedBroker,
        error: null,
      };
    case DELETE_BROKER_SUCCESS:
      return {
        ...state,
        loading: false,
        brokers: state.brokers.filter(
          (broker) => broker._id !== action.payload
        ),
        error: null,
      };
    case REFERED_VISITORS_BY_BROKER_SUCCESS:
      return {
        ...state,
        loading: false,
        referredVisitors: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };
    case GET_BROKERS_FAILURE:
    case CREATE_BROKER_FAILURE:
    case GET_BROKER_BY_ID_FAILURE:
    case UPDATE_BROKER_FAILURE:
    case APPROVE_BROKER_FAILURE:
    case REJECT_BROKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        brokers: action.type === GET_BROKERS_FAILURE ? [] : state.brokers,
      };
    case DELETE_BROKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REFERED_VISITORS_BY_BROKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EXPORT_BROKER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EXPORT_BROKER_DATA_SUCCESS:
      return {
        ...state,
        exportedBrokerData: action.payload,
        loading: false,
        error: null,
      };
    case EXPORT_BROKER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ========================
    // BROKER TEAM REDUCERS CASE
    // ========================

    case GET_BROKER_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BROKER_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        team: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };
    case GET_BROKER_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        team: [],
        error: action.payload,
      };
    case UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        team: state.team.map((member) =>
          member._id === action.payload._id ? action.payload : member
        ),
        error: null,
      };
    case UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ========================
    // BROKER KPI REDUCERS CASE
    // ========================

    case GET_BROKER_KPI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BROKER_KPI_SUCCESS:
      return {
        ...state,
        loading: false,
        kpi: action.payload,
        error: null,
      };
    case GET_BROKER_KPI_FAILURE:
      return {
        ...state,
        loading: false,
        kpi: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default brokerReducer;