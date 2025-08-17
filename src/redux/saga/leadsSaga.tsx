import { call, put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  GET_LEAD_REQUEST,
  GET_LEAD_SUCCESS,
  GET_LEAD_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
} from "../actions/actionTypes";

import { deleteRequest, getRequest } from "../../config/apihelpers";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";

function* getLeadSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${
      API_ENDPOINTS.GET_LEAD
    }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    yield put({ type: GET_LEAD_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: GET_LEAD_FAILURE, payload: error.message });
  }
}

function* deleteLeadSaga(action: any): any {
  try {
    const response = yield call(deleteRequest, `/api/leads/${action.payload}`);
    if (response.ok) {
      yield put({ type: DELETE_LEAD_SUCCESS, payload: action.payload });
    } else {
      const data = yield response.json();
      throw new Error(data.message || "Failed to delete lead");
    }
  } catch (error: any) {
    yield put({ type: DELETE_LEAD_FAILURE, payload: error.message });
  }
}

export default function* leadsSaga() {
  yield takeLatest(GET_LEAD_REQUEST, getLeadSaga);
  yield takeLatest(DELETE_LEAD_REQUEST, deleteLeadSaga);
}
