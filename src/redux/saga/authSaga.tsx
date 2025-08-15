import { call, put, takeLatest } from "redux-saga/effects";
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
} from "../actions/actionTypes";
import { postRequest, getRequest } from "../../config/apihelpers";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import { toast } from "react-toastify";

function* registerSaga(action: any): any {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.REGISTER}`,
      action.payload
    );

    yield put({ type: REGISTER_SUCCESS, payload: response });
    toast.success(response.message || "Registration successful");
    if (action.payload.navigate) {
      action.payload.navigate("/dashboard");
    }
  } catch (error: any) {
    yield put({
      type: REGISTER_FAILURE,
      payload: error?.message || "Registration failed",
    });
    toast.error(error?.message || "Registration failed");
  }
}

function* loginSaga(action: any): any {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.LOGIN}`,
      action.payload
    );
    localStorage.setItem("authToken", response.user.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    yield put({ type: LOGIN_SUCCESS, payload: response });
    toast.success(response.message || "Login successful");
    if (action.payload.navigate) {
      action.payload.navigate("/dashboard");
    }
  } catch (error: any) {
    yield put({
      type: LOGIN_FAILURE,
      payload: error?.message || "Login failed",
    });
    toast.error(error?.message || "Login failed");
  }
}

function* requestEmailLoginOtpSaga(action: any): any {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}/api/auth/login/request-email-otp`,
      action.payload
    );
    yield put({ type: REQUEST_EMAIL_LOGIN_OTP_SUCCESS, payload: response });
    toast.success(response.message || "OTP sent to your email");
  } catch (error: any) {
    yield put({
      type: REQUEST_EMAIL_LOGIN_OTP_FAILURE,
      payload: error?.message || "Failed to send OTP",
    });
    toast.error(error?.message || "Failed to send OTP");
  }
}

function* verifyEmailLoginOtpSaga(action: any): any {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}/api/auth/login/verify-email-otp`,
      action.payload
    );

    localStorage.setItem("authToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    yield put({ type: VERIFY_EMAIL_LOGIN_OTP_SUCCESS, payload: response });
    toast.success(response.message || "OTP verified successfully");
    if (action.payload.navigate) {
      action.payload.navigate("/dashboard");
    }
  } catch (error: any) {
    yield put({
      type: VERIFY_EMAIL_LOGIN_OTP_FAILURE,
      payload: error?.message || "OTP verification failed",
    });
    toast.error(error?.message || "OTP verification failed");
  }
}

function* getUserProfileSaga(action: any): any {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.GET_USER_PROFILE}`,
      action.payload
    );
    yield put({ type: GET_USER_PROFILE_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: GET_USER_PROFILE_FAILURE,
      payload: error?.message || "Failed to fetch user profile",
    });
  }
}

function* getAllUsersSaga(action: any): any {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "",
    } = action.payload || {};
    let query = `?page=${page}&limit=${limit}`;
    if (search) query += `&search=${encodeURIComponent(search)}`;
    if (role) query += `&role=${encodeURIComponent(role)}`;

    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.GET_ALL_USERS}${query}`
    );
    yield put({ type: GET_ALL_USERS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: GET_ALL_USERS_FAILURE,
      payload: error?.message || "Failed to fetch users",
    });
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REQUEST_EMAIL_LOGIN_OTP_REQUEST, requestEmailLoginOtpSaga);
  yield takeLatest(VERIFY_EMAIL_LOGIN_OTP_REQUEST, verifyEmailLoginOtpSaga);
  yield takeLatest(GET_USER_PROFILE_REQUEST, getUserProfileSaga);
  yield takeLatest(GET_ALL_USERS_REQUEST, getAllUsersSaga);
}
