import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_BROKERS_REQUEST,
  GET_BROKERS_SUCCESS,
  GET_BROKERS_FAILURE,
  CREATE_BROKER_REQUEST,
  CREATE_BROKER_SUCCESS,
  CREATE_BROKER_FAILURE,
  GET_BROKER_BY_ID_REQUEST,
  GET_BROKER_BY_ID_SUCCESS,
  GET_BROKER_BY_ID_FAILURE,
  UPDATE_BROKER_REQUEST,
  UPDATE_BROKER_SUCCESS,
  UPDATE_BROKER_FAILURE,
  APPROVE_BROKER_REQUEST,
  APPROVE_BROKER_SUCCESS,
  APPROVE_BROKER_FAILURE,
  REJECT_BROKER_REQUEST,
  REJECT_BROKER_SUCCESS,
  REJECT_BROKER_FAILURE,
  EXPORT_BROKER_DATA_REQUEST,
  EXPORT_BROKER_DATA_SUCCESS,
  EXPORT_BROKER_DATA_FAILURE,
  DELETE_BROKER_REQUEST,
  DELETE_BROKER_SUCCESS,
  DELETE_BROKER_FAILURE,
  REFERED_VISITORS_BY_BROKER_REQUEST,
  REFERED_VISITORS_BY_BROKER_SUCCESS,
  REFERED_VISITORS_BY_BROKER_FAILURE,

  // ========================
  // BROKER TEAM SAGA
  // ========================
  GET_BROKER_TEAM_REQUEST,
  GET_BROKER_TEAM_SUCCESS,
  GET_BROKER_TEAM_FAILURE,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,

  // ========================
  // BROKER KPI SAGA
  // ========================
  GET_BROKER_KPI_REQUEST,
  GET_BROKER_KPI_SUCCESS,
  GET_BROKER_KPI_FAILURE,
} from "../actions/actionTypes";
import {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  deleteRequest,
} from "../../config/apihelpers";
import { BASE_URL, API_ENDPOINTS } from "../../config/apiRoutes";
import swal from "sweetalert2";

function* fetchBrokersSaga(action: any): Generator<any, void, any> {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
    } = action.payload || {};

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      queryParams.append("search", search);
    }
    if (status) {
      queryParams.append("status", status);
    }
    const url = `${BASE_URL}${API_ENDPOINTS.BROKERS}?${queryParams.toString()}`;
    const response = yield call(getRequest, url);
    if (response.success) {
      yield put({ type: GET_BROKERS_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: GET_BROKERS_FAILURE,
        payload: response.message || "Failed to fetch brokers",
      });
    }
  } catch (error: any) {
    yield put({
      type: GET_BROKERS_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

function* createBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${API_ENDPOINTS.BROKERS}`,
      action.payload
    );

    if (response.success) {
      yield put({ type: CREATE_BROKER_SUCCESS, payload: response.data });
      yield swal
        .fire({
          title: "Success",
          text: response.message || "Broker created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "/brokers";
          }, 500);
        });
      yield put({ type: GET_BROKERS_REQUEST, payload: { page: 1, limit: 10 } });
    } else {
      yield put({
        type: CREATE_BROKER_FAILURE,
        payload: response.message || "Failed to create broker",
      });
      swal.fire({
        title: "Error",
        text: response.message || "Failed to create broker",
        icon: "error",
      });
    }
  } catch (error: any) {
    yield put({
      type: CREATE_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
    swal.fire({
      title: "Error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
}

function* getBrokerByIdSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.GET_BROKER_BY_ID}${id}`;
    const response = yield call(getRequest, endpoint);

    if (response.success) {
      yield put({ type: GET_BROKER_BY_ID_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: GET_BROKER_BY_ID_FAILURE,
        payload: response.message || "Failed to fetch broker details",
      });
    }
  } catch (error: any) {
    yield put({
      type: GET_BROKER_BY_ID_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

function* updateBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const { id, brokerData } = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKERS}${id}`;
    const response = yield call(putRequest, endpoint, brokerData);

    if (response.success) {
      yield put({ type: UPDATE_BROKER_SUCCESS, payload: response.data });
      swal.fire({
        title: "Success",
        text: response.message || "Broker updated successfully!",
        icon: "success",
      });
    } else {
      yield put({
        type: UPDATE_BROKER_FAILURE,
        payload: response.message || "Failed to update broker",
      });
      swal.fire({
        title: "Error",
        text: response.message || "Failed to update broker",
        icon: "error",
      });
    }
  } catch (error: any) {
    yield put({
      type: UPDATE_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
    swal.fire({
      title: "Error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
}

function* approveBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKERS}${id}/status`;
    const payload = { status: "approved" };
    const response = yield call(patchRequest, endpoint, payload);

    if (response.success) {
      yield put({ type: APPROVE_BROKER_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: APPROVE_BROKER_FAILURE,
        payload: response.message || "Failed to approve broker",
      });
    }
  } catch (error: any) {
    yield put({
      type: APPROVE_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

function* rejectBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKERS}${id}/status`;
    const payload = { status: "rejected" };
    const response = yield call(patchRequest, endpoint, payload);

    if (response.success) {
      yield put({ type: REJECT_BROKER_SUCCESS, payload: response.data });
      swal.fire({
        title: "Success",
        text: response.message || "Broker rejected successfully!",
        icon: "success",
      });
      yield put({ type: GET_BROKERS_REQUEST, payload: { page: 1, limit: 10 } });
    } else {
      yield put({
        type: REJECT_BROKER_FAILURE,
        payload: response.message || "Failed to reject broker",
      });
    }
  } catch (error: any) {
    yield put({
      type: REJECT_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

function* exportBrokerDataSaga(action: any): Generator<any, void, any> {
  try {
    const url = `${BASE_URL}/api/brokers/export/csv`;
    let params = action.payload || {};
    const response = yield call(getRequest, url, params, {
      responseType: "blob",
    });
    const blob = response.data ?? response;
    const urlObj = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = "BrokerData.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(urlObj);

    yield put({
      type: EXPORT_BROKER_DATA_SUCCESS,
    });
    swal.fire({
      title: "Success",
      text: "Broker data exported successfully!",
      icon: "success",
    });
  } catch (error: any) {
    yield put({
      type: EXPORT_BROKER_DATA_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
    swal.fire({
      title: "Error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
}

function* deleteBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKERS}${id}`;
    const response = yield call(deleteRequest, endpoint);

    if (response.success) {
      yield put({ type: DELETE_BROKER_SUCCESS, payload: id });
      swal.fire({
        title: "Success",
        text: "Broker deleted successfully!",
        icon: "success",
      });
      yield put({ type: GET_BROKERS_REQUEST, payload: { page: 1, limit: 10 } });
    } else {
      yield put({
        type: DELETE_BROKER_FAILURE,
        payload: response.message || "Failed to delete broker",
      });
      swal.fire({
        title: "Error",
        text: response.message || "Failed to delete broker",
        icon: "error",
      });
    }
  } catch (error: any) {
    yield put({
      type: DELETE_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
    swal.fire({
      title: "Error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
}

function* referedVisitorsByBrokerSaga(action: any): Generator<any, void, any> {
  try {
    const { brokerId } = action.payload;
    const endpoint = `${BASE_URL}/api/visits/brokers/${brokerId}/visitors`;
    const response = yield call(getRequest, endpoint);
    let visitorsArray = Array.isArray(response.data.visitors)
      ? response.data.visitors
      : [];

    yield put({
      type: REFERED_VISITORS_BY_BROKER_SUCCESS,
      payload: visitorsArray,
    });
  } catch (error: any) {
    yield put({
      type: REFERED_VISITORS_BY_BROKER_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

// ========================
// BROKER TEAM SAGA
// ========================

function* getBrokerTeamSaga(action: any): Generator<any, void, any> {
  try {
    const brokerId = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKER_TEAM}${brokerId}/team`;
    const response = yield call(getRequest, endpoint);
    console.log("Team data:", response.data.team);
    yield put({
      type: GET_BROKER_TEAM_SUCCESS,
      payload: response.data.team,
    });
  } catch (error: any) {
    yield put({
      type: GET_BROKER_TEAM_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

function* updateBrokerTeamMemberStatusSaga(
  action: any
): Generator<any, void, any> {
  try {
    const { brokerId, memberId, status } = action.payload;
    const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKER_TEAM}team/${memberId}/status`;
    const response = yield call(patchRequest, endpoint, { status });

    if (response.success) {
      yield put({
        type: UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS,
        payload: response.data,
      });
      swal.fire({
        title: "Success",
        text: "Broker team member status updated successfully!",
        icon: "success",
      });
      yield put({
        type: GET_BROKER_TEAM_REQUEST,
        payload: brokerId,
      });
    } else {
      yield put({
        type: UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,
        payload:
          response.message || "Failed to update broker team member status",
      });
      swal.fire({
        title: "Error",
        text: response.message || "Failed to update broker team member status",
        icon: "error",
      });
    }
  } catch (error: any) {
    yield put({
      type: UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
    swal.fire({
      title: "Error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
}

// ========================
// BROKER KPI SAGA
// ========================

function* getBrokerKpiSaga(action: any): Generator<any, void, any> {
  try {
    const brokerId = action.payload;
    const endpoint = `${BASE_URL}/api/brokers/kpi?broker_id=${brokerId}`;
    const response = yield call(getRequest, endpoint);
    yield put({
      type: GET_BROKER_KPI_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_BROKER_KPI_FAILURE,
      payload: error.message || "An unexpected error occurred",
    });
  }
}

export function* watchGetBrokers() {
  yield takeLatest(GET_BROKERS_REQUEST, fetchBrokersSaga);
  yield takeLatest(CREATE_BROKER_REQUEST, createBrokerSaga);
  yield takeLatest(GET_BROKER_BY_ID_REQUEST, getBrokerByIdSaga);
  yield takeLatest(UPDATE_BROKER_REQUEST, updateBrokerSaga);
  yield takeLatest(APPROVE_BROKER_REQUEST, approveBrokerSaga);
  yield takeLatest(REJECT_BROKER_REQUEST, rejectBrokerSaga);
  yield takeLatest(EXPORT_BROKER_DATA_REQUEST, exportBrokerDataSaga);
  yield takeLatest(DELETE_BROKER_REQUEST, deleteBrokerSaga);
  yield takeLatest(
    REFERED_VISITORS_BY_BROKER_REQUEST,
    referedVisitorsByBrokerSaga
  );
  yield takeLatest(GET_BROKER_TEAM_REQUEST, getBrokerTeamSaga);
  yield takeLatest(
    UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST,
    updateBrokerTeamMemberStatusSaga
  );
  yield takeLatest(GET_BROKER_KPI_REQUEST, getBrokerKpiSaga);
}