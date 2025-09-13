import {
  GET_REFERENCE_DATA_REQUEST,
  GET_REFERENCE_DATA_SUCCESS,
  GET_REFERENCE_DATA_FAILURE,
  GETWITHOUT_ADMIN_REFERENCE_DATA_REQUEST,
  GETWITHOUT_ADMIN_REFERENCE_DATA_SUCCESS,
  GETWITHOUT_ADMIN_REFERENCE_DATA_FAILURE,
  ADD_REFERENCE_DATA_ITEM_REQUEST,
  ADD_REFERENCE_DATA_ITEM_SUCCESS,
  ADD_REFERENCE_DATA_ITEM_FAILURE,
  REMOVE_REFERENCE_DATA_ITEM_REQUEST,
  REMOVE_REFERENCE_DATA_ITEM_SUCCESS,
  REMOVE_REFERENCE_DATA_ITEM_FAILURE,
  UPDATE_REFERENCE_DATA_ITEM_REQUEST,
  UPDATE_REFERENCE_DATA_ITEM_SUCCESS,
  UPDATE_REFERENCE_DATA_ITEM_FAILURE, 
} from "./actionTypes";

interface GetReferenceDataPayload {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  cate_key?: string;
}

export const getReferenceDataRequest = (payload?: GetReferenceDataPayload) => ({
  type: GET_REFERENCE_DATA_REQUEST,
  payload,
});

export const getReferenceDataSuccess = (data: any[]) => ({
  type: GET_REFERENCE_DATA_SUCCESS,
  payload: data,
});

export const getReferenceDataFailure = (error: string) => ({
  type: GET_REFERENCE_DATA_FAILURE,
  payload: error,
});

export const addReferenceDataItemRequest = (item: any) => ({
  type: ADD_REFERENCE_DATA_ITEM_REQUEST,
  payload: item,
});

export const addReferenceDataItemSuccess = (item: any) => ({
  type: ADD_REFERENCE_DATA_ITEM_SUCCESS,
  payload: item,
});

export const addReferenceDataItemFailure = (error: string) => ({
  type: ADD_REFERENCE_DATA_ITEM_FAILURE,
  payload: error,
});

export const removeReferenceDataItemRequest = (id: string) => ({
  type: REMOVE_REFERENCE_DATA_ITEM_REQUEST,
  payload: id,
});

export const removeReferenceDataItemSuccess = (id: string) => ({
  type: REMOVE_REFERENCE_DATA_ITEM_SUCCESS,
  payload: id,
});

export const removeReferenceDataItemFailure = (error: string) => ({
  type: REMOVE_REFERENCE_DATA_ITEM_FAILURE,
  payload: error,
});

export const getWithoutAdminReferenceDataRequest = (
  payload?: GetReferenceDataPayload
) => ({
  type: GETWITHOUT_ADMIN_REFERENCE_DATA_REQUEST,
  payload,
});

export const getWithoutAdminReferenceDataSuccess = (data: any[]) => ({
  type: GETWITHOUT_ADMIN_REFERENCE_DATA_SUCCESS,
  payload: data,
});

export const getWithoutAdminReferenceDataFailure = (error: string) => ({
  type: GETWITHOUT_ADMIN_REFERENCE_DATA_FAILURE,
  payload: error,
});

export const updateReferenceDataItemRequest = (
  itemId: string,
  category: string,
  payload: FormData
) => ({
  type: UPDATE_REFERENCE_DATA_ITEM_REQUEST,
  itemId,
  category,
  payload,
});

export const updateReferenceDataItemSuccess = (item: any) => ({
  type: UPDATE_REFERENCE_DATA_ITEM_SUCCESS,
  payload: item,
});

export const updateReferenceDataItemFailure = (error: string) => ({
  type: UPDATE_REFERENCE_DATA_ITEM_FAILURE,
  payload: error,
});