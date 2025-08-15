import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REQUEST_EMAIL_LOGIN_OTP_REQUEST,
  REQUEST_EMAIL_LOGIN_OTP_SUCCESS,
  REQUEST_EMAIL_LOGIN_OTP_FAILURE,
  VERIFY_EMAIL_LOGIN_OTP_REQUEST,
  VERIFY_EMAIL_LOGIN_OTP_SUCCESS,
  VERIFY_EMAIL_LOGIN_OTP_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  AUTH_CHECK_COMPLETE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  otpVerified: false,
  otpLoading: false,
  otpError: null,
  otpSuccess: null,
  isAuthenticated: false,
  users: [],
  totalUsers: 0,
  page: 1,
  Pages: 1,
  limit: 10,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    // Request Email Login OTP
    case REQUEST_EMAIL_LOGIN_OTP_REQUEST:
      return {
        ...state,
        otpLoading: true,
        otpError: null,
        otpSuccess: null,
      };
    case REQUEST_EMAIL_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        otpLoading: false,
        otpSuccess: action.payload,
        otpError: null,
      };
    case REQUEST_EMAIL_LOGIN_OTP_FAILURE:
      return {
        ...state,
        otpLoading: false,
        otpError: action.payload,
        otpSuccess: null,
      };

    // Verify Email Login OTP
    case VERIFY_EMAIL_LOGIN_OTP_REQUEST:
      return {
        ...state,
        otpLoading: true,
        otpError: null,
        otpVerified: false,
      };
    case VERIFY_EMAIL_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        otpLoading: false,
        otpVerified: true,
        isAuthenticated: true, // <-- Add this line
        user: action.payload.user, // <-- Set user if available
        token: action.payload.token, // <-- Set token if available
        otpError: null,
      };
    case VERIFY_EMAIL_LOGIN_OTP_FAILURE:
      return {
        ...state,
        otpLoading: false,
        otpVerified: false,
        otpError: action.payload,
      };

    // Get User Profile
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers,
        page: action.payload.page,
        Pages: action.payload.Pages,
        limit: action.payload.limit,
        error: null,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_CHECK_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case "SET_PAGE":
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

export default authReducer;
