import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DUPLICATE_PRODUCT_REQUEST,
  DUPLICATE_PRODUCT_SUCCESS,
  DUPLICATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  EXPORT_PRODUCTS_REQUEST,
  EXPORT_PRODUCTS_SUCCESS,
  EXPORT_PRODUCTS_FAILURE,
  IMPORT_PRODUCTS_REQUEST,
  IMPORT_PRODUCTS_SUCCESS,
  IMPORT_PRODUCTS_FAILURE,

  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_FAILURE,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_FAILURE,

  GET_PRODUCT_TAGS_REQUEST,
  GET_PRODUCT_TAGS_SUCCESS,
  GET_PRODUCT_TAGS_FAILURE,
  CREATE_PRODUCT_TAG_REQUEST,
  CREATE_PRODUCT_TAG_SUCCESS,
  CREATE_PRODUCT_TAG_FAILURE,
  DELETE_PRODUCT_TAG_REQUEST,
  DELETE_PRODUCT_TAG_SUCCESS,
  DELETE_PRODUCT_TAG_FAILURE,

  GET_PRODUCT_BRANDS_REQUEST,
  GET_PRODUCT_BRANDS_SUCCESS,
  GET_PRODUCT_BRANDS_FAILURE,
  CREATE_PRODUCT_BRAND_REQUEST,
  CREATE_PRODUCT_BRAND_SUCCESS,
  CREATE_PRODUCT_BRAND_FAILURE,
  DELETE_PRODUCT_BRAND_REQUEST,
  DELETE_PRODUCT_BRAND_SUCCESS,
  DELETE_PRODUCT_BRAND_FAILURE,
} from "../actions/actionTypes";
import { API_ENDPOINTS, BASE_URL } from "../../config/apiRoutes";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../config/apihelpers";
import { toast } from "react-toastify";

function* getProductsSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCTS
      }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    const productsData = response.data ? response.data : response;
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: productsData });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCTS_FAILURE,
      payload: error?.message || "Failed to fetch products",
    });
  }
}

function* createProductSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.CREATE_PRODUCT}`;
    const response = yield call(postRequest, url, action.payload);
    yield put({ type: CREATE_PRODUCT_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCTS_REQUEST, payload: { page: 1, limit: 10, search: "" } });
    toast.success("Product created successfully");
  } catch (error: any) {
    yield put({
      type: CREATE_PRODUCT_FAILURE,
      payload: error?.message || "Failed to create product",
    });
    toast.error(error?.message || "Failed to create product");
  }
}

function* duplicateProductSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DUPLICATE_PRODUCT}/${action.payload}/duplicate`;
    const response = yield call(postRequest, url, {});
    yield put({ type: DUPLICATE_PRODUCT_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCTS_REQUEST, payload: { page: 1, limit: 10, search: "" } });
    toast.success("Product duplicated successfully");
  } catch (error: any) {
    yield put({
      type: DUPLICATE_PRODUCT_FAILURE,
      payload: error?.message || "Failed to duplicate product",
    });
    toast.error(error?.message || "Failed to duplicate product");
  }
}

function* deleteProductSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_PRODUCT}/${action.payload}`;
    const response = yield call(deleteRequest, url);
    yield put({ type: DELETE_PRODUCT_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCTS_REQUEST, payload: { page: 1, limit: 10, search: "" } });
    toast.success("Product deleted successfully");
  } catch (error: any) {
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      payload: error?.message || "Failed to delete product",
    });
    toast.error(error?.message || "Failed to delete product");
  }
}

function* updateProductSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.UPDATE_PRODUCT}${action.payload.productId}`;
    const response = yield call(putRequest, url, action.payload.formData);
    yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCTS_REQUEST, payload: { page: 1, limit: 10, search: "" } });
    toast.success("Product updated successfully");
  } catch (error: any) {
    yield put({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error?.message || "Failed to update product",
    });
    toast.error(error?.message || "Failed to update product");
  }
}

function* getProductByIdSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCT_BY_ID}/${action.payload}`;
    const response = yield call(getRequest, url);
    yield put({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.product });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCT_BY_ID_FAILURE,
      payload: error?.message || "Failed to fetch product",
    });
  }
}

function* exportProductsSaga(_action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.EXPORT_PRODUCTS}`;
    // Pass responseType: "blob" to getRequest
    const response = yield call(getRequest, url, { responseType: "blob" });
    // Download the file
    const urlBlob = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", "products.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    yield put({ type: EXPORT_PRODUCTS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: EXPORT_PRODUCTS_FAILURE,
      payload: error?.message || "Failed to export products",
    });
  }
}

function* importProductsSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.IMPORT_PRODUCTS}`;
    const response = yield call(postRequest, url, action.payload);
    yield put({ type: IMPORT_PRODUCTS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: IMPORT_PRODUCTS_FAILURE,
      payload: error?.message || "Failed to import products",
    });
  }
}

function* getProductCategoriesSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCT_CATEGORIES}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    yield put({ type: GET_PRODUCT_CATEGORIES_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCT_CATEGORIES_FAILURE,
      payload: error?.message || "Failed to fetch product categories",
    });
  }
}

function* createProductCategorySaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.CREATE_PRODUCT_CATEGORY}`;
    const response = yield call(postRequest, url, action.payload);
    yield put({ type: CREATE_PRODUCT_CATEGORY_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCT_CATEGORIES_REQUEST, payload: { page: 1, limit: 10, search: "" } });
  } catch (error: any) {
    yield put({
      type: CREATE_PRODUCT_CATEGORY_FAILURE,
      payload: error?.message || "Failed to create product category",
    });
  }
}

function* deleteProductCategorySaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_PRODUCT_CATEGORY}/${action.payload}`;
    const response = yield call(deleteRequest, url);
    yield put({ type: DELETE_PRODUCT_CATEGORY_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCT_CATEGORIES_REQUEST, payload: { page: 1, limit: 10, search: "" } });
  } catch (error: any) {
    yield put({
      type: DELETE_PRODUCT_CATEGORY_FAILURE,
      payload: error?.message || "Failed to delete product category",
    });
  }
}

function* getProductTagsSaga(action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCT_TAGS}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    yield put({ type: GET_PRODUCT_TAGS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCT_TAGS_FAILURE,
      payload: error?.message || "Failed to fetch product tags",
    });
  }
}

function* createProductTagSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.CREATE_PRODUCT_TAG}`;
    const response = yield call(postRequest, url, action.payload);
    yield put({ type: CREATE_PRODUCT_TAG_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCT_TAGS_REQUEST });
  } catch (error: any) {
    yield put({
      type: CREATE_PRODUCT_TAG_FAILURE,
      payload: error?.message || "Failed to create product tag",
    });
  }
}
function* deleteProductTagSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_PRODUCT_TAG}/${action.payload}`;
    const response = yield call(deleteRequest, url);
    yield put({ type: DELETE_PRODUCT_TAG_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCT_TAGS_REQUEST });
  } catch (error: any) {
    yield put({
      type: DELETE_PRODUCT_TAG_FAILURE,
      payload: error?.message || "Failed to delete product tag",
    });
  }
}

function* getProductBrandsSaga(_action: any): any {
  try {
    const { page = 1, limit = 10, search = "" } = _action.payload || {};
    const url = `${BASE_URL}${API_ENDPOINTS.GET_PRODUCT_BRANDS}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = yield call(getRequest, url);
    yield put({ type: GET_PRODUCT_BRANDS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCT_BRANDS_FAILURE,
      payload: error?.message || "Failed to fetch product brands",
    });
  }
}

function* createProductBrandSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.CREATE_PRODUCT_BRAND}`;
    const response = yield call(postRequest, url, action.payload);
    yield put({ type: CREATE_PRODUCT_BRAND_SUCCESS, payload: response });
    yield put({ type: GET_PRODUCT_BRANDS_REQUEST });
  } catch (error: any) {
    yield put({
      type: CREATE_PRODUCT_BRAND_FAILURE,
      payload: error?.message || "Failed to create product brand",
    });
  }
}
function* deleteProductBrandSaga(action: any): any {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.DELETE_PRODUCT_BRAND}/${action.payload}`;
    yield call(deleteRequest, url);
    yield put({ type: DELETE_PRODUCT_BRAND_SUCCESS, payload: action.payload });
    yield put({ type: GET_PRODUCT_BRANDS_REQUEST });
  } catch (error: any) {
    yield put({
      type: DELETE_PRODUCT_BRAND_FAILURE,
      payload: error?.message || "Failed to delete product brand",
    });
  }
}


export default function* productSaga() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
  yield takeLatest(CREATE_PRODUCT_REQUEST, createProductSaga);
  yield takeLatest(DUPLICATE_PRODUCT_REQUEST, duplicateProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProductSaga);
  yield takeLatest(GET_PRODUCT_BY_ID_REQUEST, getProductByIdSaga);
  yield takeLatest(EXPORT_PRODUCTS_REQUEST, exportProductsSaga);
  yield takeLatest(IMPORT_PRODUCTS_REQUEST, importProductsSaga);
  yield takeLatest(GET_PRODUCT_CATEGORIES_REQUEST, getProductCategoriesSaga);
  yield takeLatest(CREATE_PRODUCT_CATEGORY_REQUEST, createProductCategorySaga);
  yield takeLatest(DELETE_PRODUCT_CATEGORY_REQUEST, deleteProductCategorySaga);
  yield takeLatest(GET_PRODUCT_TAGS_REQUEST, getProductTagsSaga);
  yield takeLatest(CREATE_PRODUCT_TAG_REQUEST, createProductTagSaga);
  yield takeLatest(DELETE_PRODUCT_TAG_REQUEST, deleteProductTagSaga);
  yield takeLatest(GET_PRODUCT_BRANDS_REQUEST, getProductBrandsSaga);
  yield takeLatest(CREATE_PRODUCT_BRAND_REQUEST, createProductBrandSaga);
  yield takeLatest(DELETE_PRODUCT_BRAND_REQUEST, deleteProductBrandSaga);
}