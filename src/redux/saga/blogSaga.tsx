import { call, put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  // Blog post sagas
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAILURE,
  DELETE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAILURE,
  UPDATE_BLOG_STATUS_REQUEST,
  UPDATE_BLOG_STATUS_SUCCESS,
  UPDATE_BLOG_STATUS_FAILURE,

  // Blog category sagas
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_SUCCESS,
  CREATE_BLOG_CATEGORY_FAILURE,
  GET_BLOG_CATEGORY_REQUEST,
  GET_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_FAILURE,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAILURE,

  // Blog tag sagas
  CREATE_BLOG_TAG_REQUEST,
  CREATE_BLOG_TAG_SUCCESS,
  CREATE_BLOG_TAG_FAILURE,
  GET_BLOG_TAG_REQUEST,
  GET_BLOG_TAG_SUCCESS,
  GET_BLOG_TAG_FAILURE,
  DELETE_BLOG_TAG_REQUEST,
  DELETE_BLOG_TAG_SUCCESS,
  DELETE_BLOG_TAG_FAILURE,
} from "../actions/actionTypes";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../../config/apihelpers";

// Blog post sagas
function* createBlogPostSaga(action: any): any {
  try {
    const data = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.CREATE_BLOG_POST}`,
      action.payload
    );
    yield put({ type: CREATE_BLOG_POST_SUCCESS, payload: data });
    Swal.fire({
      title: "Success!",
      text: "Blog post created successfully.",
      icon: "success",
    });
  } catch (error: any) {
    yield put({
      type: CREATE_BLOG_POST_FAILURE,
      payload: error.message || "Network error",
    });
    Swal.fire({
      title: "Error!",
      text: error.message || "Failed to create blog post.",
      icon: "error",
    });
  }
}

function* getAllBlogPostsSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
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

function* deleteBlogPostSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_BLOG_POST}/${action.payload}`;
    yield call(deleteRequest, url);
    yield put({ type: DELETE_BLOG_POST_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({
      type: DELETE_BLOG_POST_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* updateBlogStatusSaga(action: any): any {
  try {
    const { id, status } = action.payload;
    const url = `${BASE_URL}${API_ENDPOINTS.UPDATE_BLOG_STATUS}/${id}/status`;
    const data = yield call(patchRequest, url, { status });
    yield put({ type: UPDATE_BLOG_STATUS_SUCCESS, payload: data });
    yield put({ type: GET_ALL_BLOG_POSTS_REQUEST, payload: {} });
  } catch (error: any) {
    yield put({
      type: UPDATE_BLOG_STATUS_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

// Blog category sagas

function* createBlogCategorySaga(action: any): any {
  try {
    const data = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.CREATE_BLOG_CATEGORY}`,
      action.payload
    );
    yield put({ type: CREATE_BLOG_CATEGORY_SUCCESS, payload: data });
    yield put({ type: GET_BLOG_CATEGORY_REQUEST, payload: {} });
  } catch (error: any) {
    yield put({
      type: CREATE_BLOG_CATEGORY_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* getBlogCategorySaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${
      API_ENDPOINTS.GET_BLOG_CATEGORY
    }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const data = yield call(getRequest, url);
    yield put({ type: GET_BLOG_CATEGORY_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_BLOG_CATEGORY_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* deleteBlogCategorySaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_BLOG_CATEGORY}/${action.payload}`;
    yield call(deleteRequest, url);
    yield put({ type: DELETE_BLOG_CATEGORY_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({
      type: DELETE_BLOG_CATEGORY_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

// Blog tag sagas
function* createBlogTagSaga(action: any): any {
  try {
    const data = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.CREATE_BLOG_TAG}`,
      action.payload
    );
    yield put({ type: CREATE_BLOG_TAG_SUCCESS, payload: data });
    yield put({ type: GET_BLOG_TAG_REQUEST, payload: {} });
  } catch (error: any) {
    yield put({
      type: CREATE_BLOG_TAG_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* getBlogTagSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${
      API_ENDPOINTS.GET_BLOG_TAG
    }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const data = yield call(getRequest, url);
    yield put({ type: GET_BLOG_TAG_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_BLOG_TAG_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

function* deleteBlogTagSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_BLOG_TAG}/${action.payload}`;
    yield call(deleteRequest, url);
    yield put({ type: DELETE_BLOG_TAG_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({
      type: DELETE_BLOG_TAG_FAILURE,
      payload: error.message || "Network error",
    });
  }
}

export default function* blogSaga() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createBlogPostSaga);
  yield takeLatest(GET_ALL_BLOG_POSTS_REQUEST, getAllBlogPostsSaga);
  yield takeLatest(DELETE_BLOG_POST_REQUEST, deleteBlogPostSaga);
  yield takeLatest(UPDATE_BLOG_STATUS_REQUEST, updateBlogStatusSaga);
  yield takeLatest(CREATE_BLOG_CATEGORY_REQUEST, createBlogCategorySaga);
  yield takeLatest(GET_BLOG_CATEGORY_REQUEST, getBlogCategorySaga);
  yield takeLatest(DELETE_BLOG_CATEGORY_REQUEST, deleteBlogCategorySaga);
  yield takeLatest(CREATE_BLOG_TAG_REQUEST, createBlogTagSaga);
  yield takeLatest(GET_BLOG_TAG_REQUEST, getBlogTagSaga);
  yield takeLatest(DELETE_BLOG_TAG_REQUEST, deleteBlogTagSaga);
}
