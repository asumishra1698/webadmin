import {
  FETCH_VISITS_REQUEST,
  FETCH_VISITS_SUCCESS,
  FETCH_VISITS_FAILURE,
  FETCH_VISIT_HISTORY_REQUEST,
  FETCH_VISIT_HISTORY_SUCCESS,
  FETCH_VISIT_HISTORY_FAILURE,
} from "./actionTypes";

export const fetchVisitsRequest = (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  dateFilter?: string;
}) => ({
  type: FETCH_VISITS_REQUEST,
  payload: {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search ?? "",
    status: params.status ?? "",
    dateFilter: params.dateFilter ?? "",
  },
});

// Success action
export const fetchVisitsSuccess = (data: any) => ({
  type: FETCH_VISITS_SUCCESS,
  payload: data,
});

// Failure action
export const fetchVisitsFailure = (error: any) => ({
  type: FETCH_VISITS_FAILURE,
  payload: error,
});

export const fetchVisitHistoryRequest = (visitId: string) => ({
  type: FETCH_VISIT_HISTORY_REQUEST,
  payload: { visitId },
});

export const fetchVisitHistorySuccess = (data: any) => ({
  type: FETCH_VISIT_HISTORY_SUCCESS,
  payload: data,
});

export const fetchVisitHistoryFailure = (error: any) => ({
  type: FETCH_VISIT_HISTORY_FAILURE,
  payload: error,
});