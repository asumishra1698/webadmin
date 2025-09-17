import { takeLatest, call, put } from "redux-saga/effects";
import Swal from "sweetalert2";

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
import { getRequest, putRequest } from "../../config/apihelpers";
import { BASE_URL, API_ENDPOINTS } from "../../config/apiRoutes";

function* fetchVisitorsSaga(action: any): Generator<any, void, any> {
  try {
    const { page, limit, searchTerm, broker_name } = action.payload;
    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.VISITORS}?page=${page}&limit=${limit}&search=${searchTerm}&broker_name=${broker_name}`
    );
    yield put({
      type: FETCH_VISITORS_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_VISITORS_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

function* fetchVisitorByIdSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.VISITORS}${action.payload}`
    );
    yield put({
      type: FETCH_VISITOR_BY_ID_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_VISITOR_BY_ID_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

function* fetchVisitorHistorySaga(action: any): Generator<any, void, any> {
  try {
    const { id, page = 1, limit = 10, search } = action.payload;
    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.VISITOR_HISTORY}${id}?page=${page}&limit=${limit}&search=${search}`
    );
    yield put({
      type: FETCH_VISITOR_HISTORY_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_VISITOR_HISTORY_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

function* exportVisitorDataSaga(action: any): Generator<any, void, any> {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.EXPORT_VISITOR_DATA}`;
    let params = action.payload || {};
    const response = yield call(getRequest, url, params, {
      responseType: "blob",
    });
    const blob = response.data ? response.data : response;
    const urlObj = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = "Visitor.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(urlObj);

    // Optionally, dispatch a success action with a flag
    yield put({ type: EXPORT_VISITOR_DATA_SUCCESS });
    Swal.fire({
      title: "Success",
      text: "Visitor data exported successfully!",
      icon: "success",
    });
  } catch (error: any) {
    yield put({ type: EXPORT_VISITOR_DATA_FAILURE, payload: error.message });
  }
}

function* updateVisitorSaga(action: any): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(
      putRequest,
      `${BASE_URL}${API_ENDPOINTS.VISITORS}${id}`,
      data
    );
    yield put({
      type: UPDATE_VISITOR_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_VISITOR_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

function* fetchVisitorTagHistorySaga(action: any): Generator<any, void, any> {
  try {
    const { id, page = 1, limit = 10, search } = action.payload;
    const response = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.VISITOR_TAG_HISTORY}${id}/tags?page=${page}&limit=${limit}&search=${search}`
    );
    yield put({
      type: VISITOR_TAG_HISTORY_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: VISITOR_TAG_HISTORY_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

export default function* visitorSaga() {
  yield takeLatest(FETCH_VISITORS_REQUEST, fetchVisitorsSaga);
  yield takeLatest(FETCH_VISITOR_BY_ID_REQUEST, fetchVisitorByIdSaga);
  yield takeLatest(FETCH_VISITOR_HISTORY_REQUEST, fetchVisitorHistorySaga);
  yield takeLatest(UPDATE_VISITOR_REQUEST, updateVisitorSaga);
  yield takeLatest(EXPORT_VISITOR_DATA_REQUEST, exportVisitorDataSaga);
  yield takeLatest(VISITOR_TAG_HISTORY_REQUEST, fetchVisitorTagHistorySaga);
}