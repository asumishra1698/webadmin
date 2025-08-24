import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from "../actions/actionTypes";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import { getRequest } from "../../config/apihelpers";

function* getProductsSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${
      API_ENDPOINTS.GET_PRODUCTS
    }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    const productsData = response.data ? response.data : response;
    console.log("Products API response:", productsData);
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: productsData });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCTS_FAILURE,
      payload: error?.message || "Failed to fetch products",
    });
  }
}

export default function* productSaga() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
}
