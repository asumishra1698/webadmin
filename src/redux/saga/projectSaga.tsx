import { call, put, takeLatest, all } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    patchRequest,
} from "../../config/apihelpers";
import {
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE,
    GET_PROJECT_BY_ID_REQUEST,
    GET_PROJECT_BY_ID_SUCCESS,
    GET_PROJECT_BY_ID_FAILURE,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    TOGGLE_PROJECT_STATUS_REQUEST,
    TOGGLE_PROJECT_STATUS_SUCCESS,
    TOGGLE_PROJECT_STATUS_FAILURE,
    // GET_VISITORS_BY_PROJECT_ID_REQUEST,
    // GET_VISITORS_BY_PROJECT_ID_SUCCESS,
    // GET_VISITORS_BY_PROJECT_ID_FAILURE,
    // GET_BROKER_BY_PROJECT_ID_REQUEST,
    // GET_BROKER_BY_PROJECT_ID_SUCCESS,
    // GET_BROKER_BY_PROJECT_ID_FAILURE,
    EXPORT_PROJECT_DATA_REQUEST,
    EXPORT_PROJECT_DATA_SUCCESS,
    EXPORT_PROJECT_DATA_FAILURE,
    DELETE_PROJECT_MEDIA_REQUEST,
    DELETE_PROJECT_MEDIA_SUCCESS,
    DELETE_PROJECT_MEDIA_FAILURE,
} from "../actions/actionTypes";
import { BASE_URL, API_ENDPOINTS } from "../../config/apiRoutes";
import type {
    Project,
    ProjectsResponse,
    CreateProjectPayload,
} from "../actions/projectActions";

interface ProjectApiResponse {
    success: boolean;
    message: string;
    data: Project;
    statusCode: number;
}

function* fetchProjectsSaga(action: any): Generator<any, void, any> {
    try {
        const { page = 1, limit = "", search, city, status } = action.payload || {};
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (search) queryParams.append("search", search);
        if (city) queryParams.append("city", city);
        if (status) queryParams.append("status", status);

        const endpoint = `${BASE_URL}${API_ENDPOINTS.PROJECTS
            }?${queryParams.toString()}`;
        const response: ProjectsResponse = yield call(getRequest, endpoint);

        yield put({
            type: GET_PROJECTS_SUCCESS,
            payload: response.data,
        });
    } catch (error: any) {
        yield put({
            type: GET_PROJECTS_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch projects",
        });
    }
}

function* fetchProjectByIdSaga(action: any): Generator<any, void, any> {
    try {
        const projectId = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.GET_PROJECT_BY_ID}${projectId}`;
        const response: ProjectApiResponse = yield call(getRequest, endpoint);
        yield put({
            type: GET_PROJECT_BY_ID_SUCCESS,
            payload: response.data,
        });
    } catch (error: any) {
        yield put({
            type: GET_PROJECT_BY_ID_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch project details",
        });
    }
}

function* createProjectSaga(action: any): Generator<any, void, any> {
    try {
        const { projectData } = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.PROJECTS}`;

        let requestPayload: CreateProjectPayload | FormData = projectData;

        if (projectData.media && projectData.media.length > 0) {
            const formData = new FormData();
            Object.entries(projectData).forEach(([key, value]: [string, any]) => {
                if (key !== "media" && value) {
                    formData.append(key, value);
                }
            });
            projectData.media.forEach((file: File) => {
                formData.append("media", file);
            });
            requestPayload = formData;
        }

        const response: ProjectApiResponse = yield call(
            postRequest,
            endpoint,
            requestPayload
        );

        yield put({
            type: CREATE_PROJECT_SUCCESS,
            payload: response.data,
        });
        yield Swal.fire({
            title: "Success",
            text: "Project created successfully!",
            icon: "success",
        }).then(() => {
            setTimeout(() => {
                window.location.href = "/projects";
            }, 500);
        });
    } catch (error: any) {
        yield put({
            type: CREATE_PROJECT_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create project",
        });
        Swal.fire(
            "Error",
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create project",
            "error"
        );
    }
}

function* updateProjectSaga(action: any): Generator<any, void, any> {
    try {
        const { id, data } = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.PROJECTS}/${id}`;
        const response: ProjectApiResponse = yield call(putRequest, endpoint, data);
        yield put({
            type: UPDATE_PROJECT_SUCCESS,
            payload: response.data,
        });
        yield Swal.fire({
            title: "Success",
            text: "Project updated successfully!",
            icon: "success",
        }).then(() => {
            setTimeout(() => {
                window.location.href = "/projects";
            }, 500);
        });
    } catch (error: any) {
        yield put({
            type: UPDATE_PROJECT_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update project",
        });
        Swal.fire(
            "Error",
            error?.response?.data?.message ||
            error?.message ||
            "Failed to update project",
            "error"
        );
    }
}

function* deleteProjectSaga(action: any): Generator<any, void, any> {
    try {
        const projectId = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.PROJECTS}/${projectId}`;
        yield call(deleteRequest, endpoint);

        yield put({
            type: DELETE_PROJECT_SUCCESS,
            payload: projectId,
        });
        Swal.fire("Success", "Project deleted successfully!", "success");
    } catch (error: any) {
        yield put({
            type: DELETE_PROJECT_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete project",
        });
        Swal.fire(
            "Error",
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete project",
            "error"
        );
    }
}

function* toggleProjectStatusSaga(action: any): Generator<any, void, any> {
    try {
        const { projectId, is_active } = action.payload;
        const endpoint = `${BASE_URL}${API_ENDPOINTS.TOGGLE_PROJECT_STATUS}${projectId}/active`;
        const response: ProjectApiResponse = yield call(patchRequest, endpoint, {
            is_active,
        });
        yield put({
            type: TOGGLE_PROJECT_STATUS_SUCCESS,
            payload: response.data,
        });
        Swal.fire(
            "Success",
            `Project status updated to ${is_active ? "active" : "inactive"}!`,
            "success"
        );
        yield put({
            type: GET_PROJECTS_REQUEST,
            payload: { page: 1, limit: 100 },
        });
    } catch (error: any) {
        yield put({
            type: TOGGLE_PROJECT_STATUS_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to toggle project status",
        });
        Swal.fire(
            "Error",
            error?.response?.data?.message ||
            error?.message ||
            "Failed to toggle project status",
            "error"
        );
    }
}

// function* fetchVisitorsByProjectSaga(action: any): Generator<any, void, any> {
//     try {
//         const projectId = action.payload;
//         const endpoint = `${BASE_URL}${API_ENDPOINTS.VISITORBYPROJECT}${projectId}`;
//         const response: ProjectApiResponse = yield call(getRequest, endpoint);

//         yield put({
//             type: GET_VISITORS_BY_PROJECT_ID_SUCCESS,
//             payload: response,
//         });
//     } catch (error: any) {
//         yield put({
//             type: GET_VISITORS_BY_PROJECT_ID_FAILURE,
//             payload:
//                 error?.response?.data?.message ||
//                 error?.message ||
//                 "Failed to fetch visitors for project",
//         });
//     }
// }

// function* fetchBrokerByProjectIdSaga(action: any): Generator<any, void, any> {
//     try {
//         const projectId = action.payload;
//         const endpoint = `${BASE_URL}${API_ENDPOINTS.BROKERBYPROJECT}${projectId}`;
//         const response: ProjectApiResponse = yield call(getRequest, endpoint);
//         yield put({
//             type: GET_BROKER_BY_PROJECT_ID_SUCCESS,
//             payload: response,
//         });
//     } catch (error: any) {
//         yield put({
//             type: GET_BROKER_BY_PROJECT_ID_FAILURE,
//             payload:
//                 error?.response?.data?.message ||
//                 error?.message ||
//                 "Failed to fetch broker for project",
//         });
//     }
// }

// function* exportProjectDataSaga(action: any): Generator<any, void, any> {
//     try {
//         const endpoint = `${BASE_URL}${API_ENDPOINTS.EXPORT_PROJECT_DATA}`;
//         const params = action?.payload || {};
//         const response = yield call(getRequest, endpoint, params, {
//             responseType: "blob",
//         });

//         // Download logic here
//         const blob = response.data ?? response;
//         const urlObj = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = urlObj;
//         a.download = "ProjectData.csv";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(urlObj);

//         yield put({
//             type: EXPORT_PROJECT_DATA_SUCCESS,
//         });
//         Swal.fire({
//             title: "Success",
//             text: "Project data exported successfully!",
//             icon: "success",
//         });
//     } catch (error: any) {
//         yield put({
//             type: EXPORT_PROJECT_DATA_FAILURE,
//             payload:
//                 error?.response?.data?.message ||
//                 error?.message ||
//                 "Failed to export project data",
//         });
//         Swal.fire({
//             title: "Error",
//             text: error?.message || "Failed to export project data",
//             icon: "error",
//         });
//     }
// }

function* exportProjectDataSaga(action: any): Generator<any, void, any> {
    try {
        const endpoint = `${BASE_URL}${API_ENDPOINTS.EXPORT_PROJECT_DATA}`;
        const params = action?.payload || {};
        const response = yield call(getRequest, endpoint, params, {
            responseType: "blob",
        });

        // Download logic here
        const blob = response.data ?? response;
        const urlObj = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlObj;
        a.download = "ProjectData.csv"; // Change extension if needed
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(urlObj);

        yield put({
            type: EXPORT_PROJECT_DATA_SUCCESS,
        });
        Swal.fire({
            title: "Success",
            text: "Project data exported successfully!",
            icon: "success",
        });
    } catch (error: any) {
        yield put({
            type: EXPORT_PROJECT_DATA_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to export project data",
        });
        Swal.fire({
            title: "Error",
            text: error?.message || "Failed to export project data",
            icon: "error",
        });
    }
}


function* deleteProjectMediaSaga(action: any): Generator<any, void, any> {
    try {
        const { projectId, mediaId } = action.payload;
        const endpoint = `${BASE_URL}/api/projects/${projectId}/media/${mediaId}`;
        yield call(deleteRequest, endpoint);

        yield put({
            type: DELETE_PROJECT_MEDIA_SUCCESS,
            payload: mediaId,
        });
        Swal.fire("Success", "Media deleted successfully!", "success");
    } catch (error: any) {
        yield put({
            type: DELETE_PROJECT_MEDIA_FAILURE,
            payload:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete media",
        });
        Swal.fire(
            "Error",
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete media",
            "error"
        );
    }
}

export default function* projectSaga() {
    yield all([
        takeLatest(GET_PROJECTS_REQUEST, fetchProjectsSaga),
        takeLatest(GET_PROJECT_BY_ID_REQUEST, fetchProjectByIdSaga),
        // takeLatest(GET_VISITORS_BY_PROJECT_ID_REQUEST, fetchVisitorsByProjectSaga),
        takeLatest(TOGGLE_PROJECT_STATUS_REQUEST, toggleProjectStatusSaga),
        takeLatest(CREATE_PROJECT_REQUEST, createProjectSaga),
        takeLatest(UPDATE_PROJECT_REQUEST, updateProjectSaga),
        takeLatest(DELETE_PROJECT_REQUEST, deleteProjectSaga),
        // takeLatest(GET_BROKER_BY_PROJECT_ID_REQUEST, fetchBrokerByProjectIdSaga),
        takeLatest(EXPORT_PROJECT_DATA_REQUEST, exportProjectDataSaga),
        takeLatest(DELETE_PROJECT_MEDIA_REQUEST, deleteProjectMediaSaga),
    ]);
}