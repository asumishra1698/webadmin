import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
} from "./actionTypes";

export const getProductsRequest = (payload: {
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: GET_PRODUCTS_REQUEST,
  payload,
});

export const getProductsSuccess = (data: any) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: data,
});

export const getProductsFailure = (error: string) => ({
  type: GET_PRODUCTS_FAILURE,
  payload: error,
});

export const createProductRequest = (formData: FormData) => ({
  type: CREATE_PRODUCT_REQUEST,
  payload: formData,
});

export const createProductSuccess = (data: any) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: data,
});

export const createProductFailure = (error: string) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});
