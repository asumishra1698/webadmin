import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SALES_RM_REQUEST,
  GET_SALES_RM_SUCCESS,
  GET_SALES_RM_FAILURE,
} from "../actions/actionTypes";
import { BASE_URL } from "../../config/apiRoutes";
import { getRequest } from "../../config/apihelpers";

function* getSalesRmsSaga(): Generator<any, void, any> {
  try {
    const url = `${BASE_URL}/api/auth/sales-rms`;
    const response = yield call(getRequest, url);    
    if (response.success && response.data && response.statusCode === 200) {
      yield put({
        type: GET_SALES_RM_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: GET_SALES_RM_FAILURE,
        payload: response.message || "Failed to fetch Sales RM users",
      });
    }
  } catch (error: any) {
    yield put({
      type: GET_SALES_RM_FAILURE,
      payload: error.message || "Network error. Please try again.",
    });
  }
}

export default function* saleRmSaga() {
  yield takeLatest(GET_SALES_RM_REQUEST, getSalesRmsSaga);
}