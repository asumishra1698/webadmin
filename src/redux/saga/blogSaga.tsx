import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
} from "../actions/actionTypes";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import { postRequest } from "../../config/apihelpers";

function* createBlogPostSaga(action: any): any {
  try {
    const data = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.CREATE_BLOG_POST}`,
      action.payload
    );
    yield put({ type: CREATE_BLOG_POST_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: CREATE_BLOG_POST_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

export default function* blogSaga() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createBlogPostSaga);
}
