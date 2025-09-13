import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT_BY_ID_REQUEST,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  TOGGLE_PROJECT_STATUS_REQUEST,
  TOGGLE_PROJECT_STATUS_SUCCESS,
  TOGGLE_PROJECT_STATUS_FAILURE,
  GET_VISITORS_BY_PROJECT_ID_REQUEST,
  GET_VISITORS_BY_PROJECT_ID_SUCCESS,
  GET_VISITORS_BY_PROJECT_ID_FAILURE,
  GET_BROKER_BY_PROJECT_ID_REQUEST,
  GET_BROKER_BY_PROJECT_ID_SUCCESS,
  GET_BROKER_BY_PROJECT_ID_FAILURE,
  EXPORT_PROJECT_DATA_REQUEST,
  EXPORT_PROJECT_DATA_SUCCESS,
  EXPORT_PROJECT_DATA_FAILURE,
  DELETE_PROJECT_MEDIA_REQUEST,
  DELETE_PROJECT_MEDIA_SUCCESS,
  DELETE_PROJECT_MEDIA_FAILURE,
} from "../actions/actionTypes";
import type { Project } from "../actions/projectActions";

// ========================
// STATE INTERFACE
// ========================
export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  fetchLoading: boolean;
  success: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  visitors?: any[];
  brokers?: any[];
  exportedProjectData?: any;
}

// ========================
// ACTION INTERFACE
// ========================
interface Action {
  type: string;
  payload?: any;
}

// ========================
// INITIAL STATE
// ========================
const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  fetchLoading: false,
  success: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// ========================
// REDUCER
// ========================
const projectReducer = (state = initialState, action: Action): ProjectState => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        fetchLoading: true,
        success: false,
        error: null,
      };

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.data,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        },
        fetchLoading: false,
        error: null,
      };

    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        fetchLoading: false,
        projects: [],
        error: action.payload,
      };

    case GET_PROJECT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProject: action.payload,
        error: null,
      };

    case GET_PROJECT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        currentProject: null,
        error: action.payload,
      };

    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        createLoading: true,
        error: null,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createLoading: false,
        projects: [action.payload, ...state.projects],
        totalItems: state.totalItems + 1,
        error: null,
      };

    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        createLoading: false,
        error: action.payload,
      };

    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
        currentProject:
          state.currentProject?._id === action.payload._id
            ? action.payload
            : state.currentProject,
        error: null,
      };

    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
      };

    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        currentProject:
          state.currentProject?._id === action.payload
            ? null
            : state.currentProject,
        totalItems: Math.max(0, state.totalItems - 1),
        error: null,
      };

    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload,
      };

    case TOGGLE_PROJECT_STATUS_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
      };

    case TOGGLE_PROJECT_STATUS_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
        currentProject:
          state.currentProject?._id === action.payload._id
            ? action.payload
            : state.currentProject,
        error: null,
      };

    case TOGGLE_PROJECT_STATUS_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
      };

    // GET VISITORS BY PROJECT
    case GET_VISITORS_BY_PROJECT_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_VISITORS_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        visitors: action.payload.data || [],
        error: null,
      };

    case GET_VISITORS_BY_PROJECT_ID_FAILURE:
      return {
        ...state,
        loading: false,
        currentProject: state.currentProject
          ? { ...state.currentProject, visitors: [] }
          : null,
        error: action.payload,
      };

    // GET BROKER BY PROJECT
    case GET_BROKER_BY_PROJECT_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BROKER_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        brokers: action.payload.data || [],
        loading: false,
        error: null,
      };

    case GET_BROKER_BY_PROJECT_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PROJECT_MEDIA_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
      };

    case DELETE_PROJECT_MEDIA_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              media: state.currentProject.media
                ? state.currentProject.media.filter(
                    (m: any) => m._id !== action.payload
                  )
                : [],
            }
          : state.currentProject,
        error: null,
      };

    case DELETE_PROJECT_MEDIA_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
      };

    // EXPORT PROJECT DATA
    case EXPORT_PROJECT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EXPORT_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        exportedProjectData: action.payload,
        error: null,
      };

    case EXPORT_PROJECT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default projectReducer;