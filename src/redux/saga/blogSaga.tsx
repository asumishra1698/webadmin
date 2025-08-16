import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAILURE,
  GET_BLOG_CATEGORY_REQUEST,
  GET_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_FAILURE,
} from "../actions/actionTypes";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import { getRequest, postRequest } from "../../config/apihelpers";

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

function* getAllBlogPostsSaga(action: any): any {
  try {
    const { page = 1, limit = 100, search = "" } = action.payload || {};
    const url = `${BASE_URL}${
      API_ENDPOINTS.GET_ALL_BLOG_POSTS
    }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const data = yield call(getRequest, url);
    console.log("Fetched blog posts:", data);
    yield put({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_ALL_BLOG_POSTS_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* getBlogCategorySaga(): any {
  try {
    const data = yield call(
      getRequest,
      `${BASE_URL}${API_ENDPOINTS.GET_BLOG_CATEGORY}`
    );
    yield put({ type: GET_BLOG_CATEGORY_SUCCESS, payload: data });
    console.log("Fetched blog categories:", data);
  } catch (error: any) {
    yield put({
      type: GET_BLOG_CATEGORY_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

export default function* blogSaga() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createBlogPostSaga);
  yield takeLatest(GET_ALL_BLOG_POSTS_REQUEST, getAllBlogPostsSaga);
  yield takeLatest(GET_BLOG_CATEGORY_REQUEST, getBlogCategorySaga);
}
