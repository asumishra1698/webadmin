import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_REFERENCE_DATA_REQUEST,
    GET_REFERENCE_DATA_SUCCESS,
    GET_REFERENCE_DATA_FAILURE,
    ADD_REFERENCE_DATA_ITEM_REQUEST,
    ADD_REFERENCE_DATA_ITEM_SUCCESS,
    ADD_REFERENCE_DATA_ITEM_FAILURE,
    REMOVE_REFERENCE_DATA_ITEM_REQUEST,
    REMOVE_REFERENCE_DATA_ITEM_SUCCESS,
    REMOVE_REFERENCE_DATA_ITEM_FAILURE,
    UPDATE_REFERENCE_DATA_ITEM_REQUEST,
    UPDATE_REFERENCE_DATA_ITEM_SUCCESS,
    UPDATE_REFERENCE_DATA_ITEM_FAILURE,
} from "../actions/actionTypes";

import Swal from "sweetalert2";

import {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest,
} from "../../config/apihelpers";
import { BASE_URL, API_ENDPOINTS } from "../../config/apiRoutes";

function* fetchReferenceDataSaga(action: any): Generator<any, void, any> {
    try {
        const {
            page = 1,
            limit = 100,
            search = "",
            category = "",
        } = action.payload || {};

        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (search) {
            queryParams.append("search", search);
        }
        if (category) {
            queryParams.append("category", category);
        }

        const endpoint = `${BASE_URL}${API_ENDPOINTS.REFERENCE_DATA
            }?${queryParams.toString()}`;
        const response: any = yield call(getRequest, endpoint);

        if (response.success) {
            yield put({ type: GET_REFERENCE_DATA_SUCCESS, payload: response.data });
        } else {
            yield put({
                type: GET_REFERENCE_DATA_FAILURE,
                payload: response.message || "Failed to fetch reference data",
            });
        }
    } catch (error: any) {
        yield put({
            type: GET_REFERENCE_DATA_FAILURE,
            payload: error?.message || "Failed to fetch reference data",
        });
    }
}

function* addReferenceDataItemSaga(action: any): Generator<any, void, any> {
    try {
        const endpoint = `${BASE_URL}${API_ENDPOINTS.REFERENCE_DATA}`;
        const response: any = yield call(postRequest, endpoint, action.payload);

        if (response.success) {
            yield put({
                type: ADD_REFERENCE_DATA_ITEM_SUCCESS,
                payload: response.data,
            });
            yield put({ type: GET_REFERENCE_DATA_REQUEST });
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Reference data item added successfully!",
            });
        } else {
            yield put({
                type: ADD_REFERENCE_DATA_ITEM_FAILURE,
                payload: response.message || "Failed to add reference data item",
            });
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.message || "Failed to add reference data item",
            });
        }
    } catch (error: any) {
        yield put({
            type: ADD_REFERENCE_DATA_ITEM_FAILURE,
            payload: error?.message || "Failed to add reference data item",
        });
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.message || "Failed to add reference data item",
        });
    }
}

function* removeReferenceDataItemSaga(action: any): Generator<any, void, any> {
    try {
        const id = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.REMOVE_REFERENCE_DATA_ITEM}${id}`;
        const response: any = yield call(deleteRequest, endpoint);

        if (response.success) {
            yield put({ type: REMOVE_REFERENCE_DATA_ITEM_SUCCESS, payload: id });
            yield put({ type: GET_REFERENCE_DATA_REQUEST });
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Reference data item removed successfully!",
            });
        } else {
            yield put({
                type: REMOVE_REFERENCE_DATA_ITEM_FAILURE,
                payload: response.message || "Failed to remove reference data item",
            });
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.message || "Failed to remove reference data item",
            });
        }
    } catch (error: any) {
        yield put({
            type: REMOVE_REFERENCE_DATA_ITEM_FAILURE,
            payload: error?.message || "Failed to remove reference data item",
        });
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.message || "Failed to remove reference data item",
        });
    }
}

function* updateReferenceDataItemSaga(action: any): Generator<any, void, any> {
    try {
        const { itemId, category, payload } = action;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.REFERENCE_DATA}/${itemId}/${category}`;
        const response: any = yield call(putRequest, endpoint, payload);

        if (response.success) {
            yield put({
                type: UPDATE_REFERENCE_DATA_ITEM_SUCCESS,
                payload: response.data,
            });
            yield put({ type: GET_REFERENCE_DATA_REQUEST });
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Reference data item updated successfully!",
            });
        } else {
            yield put({
                type: UPDATE_REFERENCE_DATA_ITEM_FAILURE,
                payload: response.message || "Failed to update reference data item",
            });
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.message || "Failed to update reference data item",
            });
        }
    } catch (error: any) {
        yield put({
            type: UPDATE_REFERENCE_DATA_ITEM_FAILURE,
            payload: error?.message || "Failed to update reference data item",
        });
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.message || "Failed to update reference data item",
        });
    }
}

function* referenceDataSaga() {
    yield takeLatest(GET_REFERENCE_DATA_REQUEST, fetchReferenceDataSaga);
    yield takeLatest(ADD_REFERENCE_DATA_ITEM_REQUEST, addReferenceDataItemSaga);
    yield takeLatest(
        UPDATE_REFERENCE_DATA_ITEM_REQUEST,
        updateReferenceDataItemSaga
    );
    yield takeLatest(
        REMOVE_REFERENCE_DATA_ITEM_REQUEST,
        removeReferenceDataItemSaga
    );
}

export default referenceDataSaga;