import {
  GET_SALES_RM_REQUEST,
  GET_SALES_RM_SUCCESS,
  GET_SALES_RM_FAILURE,
} from "./actionTypes";

export const getSalesRmRequest = () => ({
  type: GET_SALES_RM_REQUEST,
});

export const getSalesRmSuccess = (data: any[]) => ({
  type: GET_SALES_RM_SUCCESS,
  payload: data,
});

export const getSalesRmFailure = (error: string) => ({
  type: GET_SALES_RM_FAILURE,
  payload: error,
});