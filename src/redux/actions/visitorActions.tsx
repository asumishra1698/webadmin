import {
  FETCH_VISITORS_REQUEST,
  FETCH_VISITORS_SUCCESS,
  FETCH_VISITORS_FAILURE,
  FETCH_VISITOR_BY_ID_REQUEST,
  FETCH_VISITOR_BY_ID_SUCCESS,
  FETCH_VISITOR_BY_ID_FAILURE,
  FETCH_VISITOR_HISTORY_REQUEST,
  FETCH_VISITOR_HISTORY_SUCCESS,
  FETCH_VISITOR_HISTORY_FAILURE,
  EXPORT_VISITOR_DATA_REQUEST,
  EXPORT_VISITOR_DATA_SUCCESS,
  EXPORT_VISITOR_DATA_FAILURE,
  UPDATE_VISITOR_REQUEST,
  UPDATE_VISITOR_SUCCESS,
  UPDATE_VISITOR_FAILURE,
  VISITOR_TAG_HISTORY_REQUEST,
  VISITOR_TAG_HISTORY_SUCCESS,
  VISITOR_TAG_HISTORY_FAILURE,
} from "./actionTypes";

interface GetVisitorDataParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Request action
export const fetchVisitorsRequest = (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  broker_name?: string;
}) => ({
  type: FETCH_VISITORS_REQUEST,
  payload: {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    broker_name: params.broker_name ?? "",
    search: params.search ?? "",
    status: params.status ?? "",
  },
});

// Success action
export const fetchVisitorsSuccess = (data: any) => ({
  type: FETCH_VISITORS_SUCCESS,
  payload: data,
});

// Failure action
export const fetchVisitorsFailure = (error: any) => ({
  type: FETCH_VISITORS_FAILURE,
  payload: error,
});

export const fetchVisitorByIdRequest = (id: string) => ({
  type: FETCH_VISITOR_BY_ID_REQUEST,
  payload: id,
});

export const fetchVisitorByIdSuccess = (data: any) => ({
  type: FETCH_VISITOR_BY_ID_SUCCESS,
  payload: data,
});

export const fetchVisitorByIdFailure = (error: any) => ({
  type: FETCH_VISITOR_BY_ID_FAILURE,
  payload: error,
});

export const fetchVisitorHistoryRequest = (params: {
  id: string;
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: FETCH_VISITOR_HISTORY_REQUEST,
  payload: {
    id: params.id,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search ?? "",
  },
});

export const fetchVisitorHistorySuccess = (data: any) => ({
  type: FETCH_VISITOR_HISTORY_SUCCESS,
  payload: data,
});

export const fetchVisitorHistoryFailure = (error: any) => ({
  type: FETCH_VISITOR_HISTORY_FAILURE,
  payload: error,
});

export const exportVisitorDataRequest = (params: GetVisitorDataParams) => ({
  type: EXPORT_VISITOR_DATA_REQUEST,
  payload: params,
});
export const exportVisitorDataSuccess = (data: any) => ({
  type: EXPORT_VISITOR_DATA_SUCCESS,
  payload: data,
});
export const exportVisitorDataFailure = (error: any) => ({
  type: EXPORT_VISITOR_DATA_FAILURE,
  payload: error,
});

export const updateVisitorRequest = (id: string, data: any) => ({
  type: UPDATE_VISITOR_REQUEST,
  payload: { id, data },
});

export const updateVisitorSuccess = (data: any) => ({
  type: UPDATE_VISITOR_SUCCESS,
  payload: data,
});

export const updateVisitorFailure = (error: any) => ({
  type: UPDATE_VISITOR_FAILURE,
  payload: error,
});

export const fetchVisitorTagHistoryRequest = (params: {
  id: string;
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: VISITOR_TAG_HISTORY_REQUEST,
  payload: {
    id: params.id,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search ?? "",
  },
});

export const fetchVisitorTagHistorySuccess = (data: any) => ({
  type: VISITOR_TAG_HISTORY_SUCCESS,
  payload: data,
});

export const fetchVisitorTagHistoryFailure = (error: any) => ({
  type: VISITOR_TAG_HISTORY_FAILURE,
  payload: error,
});