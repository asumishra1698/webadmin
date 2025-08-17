import {
  GET_LEAD_REQUEST,
  GET_LEAD_SUCCESS,
  GET_LEAD_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
} from "./actionTypes";

export const getLeadRequest = (payload: {
  page: number;
  limit: number;
  search: string;
}) => ({
  type: GET_LEAD_REQUEST,
  payload,
});
export const getLeadSuccess = (data: any) => ({
  type: GET_LEAD_SUCCESS,
  payload: data,
});

export const getLeadFailure = (error: any) => ({
  type: GET_LEAD_FAILURE,
  payload: error,
});

export const deleteLeadRequest = (id: string) => ({
  type: DELETE_LEAD_REQUEST,
  payload: id,
});
export const deleteLeadSuccess = (id: string) => ({
  type: DELETE_LEAD_SUCCESS,
  payload: id,
});

export const deleteLeadFailure = (error: any) => ({
  type: DELETE_LEAD_FAILURE,
  payload: error,
});
