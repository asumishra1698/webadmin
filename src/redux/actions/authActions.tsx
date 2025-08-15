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
} from "./actionTypes";

export const registerRequest = (payload: FormData) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (data: any) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginRequest = (payload: {
  email: string;
  mobile: string;
  password: string;
  role: string;
}) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const requestEmailLoginOtpRequest = (payload: { email: string }) => ({
  type: REQUEST_EMAIL_LOGIN_OTP_REQUEST,
  payload,
});

export const requestEmailLoginOtpSuccess = (data: any) => ({
  type: REQUEST_EMAIL_LOGIN_OTP_SUCCESS,
  payload: data,
});

export const requestEmailLoginOtpFailure = (error: string) => ({
  type: REQUEST_EMAIL_LOGIN_OTP_FAILURE,
  payload: error,
});

export const verifyEmailLoginOtpRequest = (payload: {
  email: string;
  otp: string;
}) => ({
  type: VERIFY_EMAIL_LOGIN_OTP_REQUEST,
  payload,
});

export const verifyEmailLoginOtpSuccess = (data: any) => ({
  type: VERIFY_EMAIL_LOGIN_OTP_SUCCESS,
  payload: data,
});

export const verifyEmailLoginOtpFailure = (error: string) => ({
  type: VERIFY_EMAIL_LOGIN_OTP_FAILURE,
  payload: error,
});

export const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});

export const getUserProfileSuccess = (data: any) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: data,
});

export const getUserProfileFailure = (error: string) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});

export const getAllUsersRequest = (payload?: any) => ({
  type: GET_ALL_USERS_REQUEST,
  payload,
});

export const setPage = (page: number) => ({
  type: "SET_PAGE",
  payload: page,
});

export const getAllUsersSuccess = (data: any) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data,
});

export const getAllUsersFailure = (error: string) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error,
});
