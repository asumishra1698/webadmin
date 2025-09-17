import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_VISITS_REQUEST,
  FETCH_VISITS_SUCCESS,
  FETCH_VISITS_FAILURE,
  FETCH_VISIT_HISTORY_REQUEST,
  FETCH_VISIT_HISTORY_SUCCESS,
  FETCH_VISIT_HISTORY_FAILURE,
} from "../actions/actionTypes";
import { getRequest } from "../../config/apihelpers";
import { BASE_URL } from "../../config/apiRoutes";

function* fetchVisitsSaga(action: any): Generator<any, void, any> {
  try {
    const { page, limit, search, status } = action.payload;
    const url = `${BASE_URL}/api/visits?page=${page}&limit=${limit}&search=${search}&status=${status}`;
    const response = yield call(getRequest, url);
    yield put({
      type: FETCH_VISITS_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_VISITS_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

function* fetchVisitHistorySaga(action: any): Generator<any, void, any> {
  try {
    const { visitId } = action.payload;
    const url = `${BASE_URL}/api/visits/${visitId}/history/`;
    const response = yield call(getRequest, url);
    yield put({
      type: FETCH_VISIT_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_VISIT_HISTORY_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
}

export default function* visitsSaga() {
  yield takeLatest(FETCH_VISITS_REQUEST, fetchVisitsSaga);
  yield takeLatest(FETCH_VISIT_HISTORY_REQUEST, fetchVisitHistorySaga);
}