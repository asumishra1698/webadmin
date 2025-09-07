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
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,

  GET_PRODUCT_BRANDS_REQUEST,
  GET_PRODUCT_BRANDS_SUCCESS,
  GET_PRODUCT_BRANDS_FAILURE,
  CREATE_PRODUCT_BRAND_REQUEST,
  CREATE_PRODUCT_BRAND_SUCCESS,
  CREATE_PRODUCT_BRAND_FAILURE,
  DELETE_PRODUCT_BRAND_REQUEST,
  DELETE_PRODUCT_BRAND_SUCCESS,
  DELETE_PRODUCT_BRAND_FAILURE,


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

export const getProductByIdRequest = (productId: string) => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  payload: productId,
});
export const getProductByIdSuccess = (data: any) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: data,
});
export const getProductByIdFailure = (error: string) => ({
  type: GET_PRODUCT_BY_ID_FAILURE,
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

export const deleteProductRequest = (productId: string) => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: productId,
});
export const deleteProductSuccess = (data: any) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: data,
});
export const deleteProductFailure = (error: string) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductRequest = (productId: string, formData: FormData) => ({
  type: UPDATE_PRODUCT_REQUEST,
  payload: { productId, formData },
});

export const updateProductSuccess = (data: any) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: data,
});
export const updateProductFailure = (error: string) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

// Product Brand Actions
export const getProductBrandsRequest = (payload: {
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: GET_PRODUCT_BRANDS_REQUEST,
  payload,
});
export const getProductBrandsSuccess = (data: any) => ({
  type: GET_PRODUCT_BRANDS_SUCCESS,
  payload: data,
});
export const getProductBrandsFailure = (error: string) => ({
  type: GET_PRODUCT_BRANDS_FAILURE,
  payload: error,
});

export const createProductBrandRequest = (formData: FormData) => ({
  type: CREATE_PRODUCT_BRAND_REQUEST,
  payload: formData,
});
export const createProductBrandSuccess = (data: any) => ({
  type: CREATE_PRODUCT_BRAND_SUCCESS,
  payload: data,
});
export const createProductBrandFailure = (error: string) => ({
  type: CREATE_PRODUCT_BRAND_FAILURE,
  payload: error,
});

export const deleteProductBrandRequest = (brandId: string) => ({
  type: DELETE_PRODUCT_BRAND_REQUEST,
  payload: brandId,
});
export const deleteProductBrandSuccess = (data: any) => ({
  type: DELETE_PRODUCT_BRAND_SUCCESS,
  payload: data,
});
export const deleteProductBrandFailure = (error: string) => ({
  type: DELETE_PRODUCT_BRAND_FAILURE,
  payload: error,
});

// Product Category Actions
export const getProductCategoriesRequest = (payload: {
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: GET_PRODUCT_CATEGORIES_REQUEST,
  payload,
});
export const getProductCategoriesSuccess = (data: any) => ({
  type: GET_PRODUCT_CATEGORIES_SUCCESS,
  payload: data,
});
export const getProductCategoriesFailure = (error: string) => ({
  type: GET_PRODUCT_CATEGORIES_FAILURE,
  payload: error,
});

export const createProductCategoryRequest = (formData: FormData) => ({
  type: CREATE_PRODUCT_CATEGORY_REQUEST,
  payload: formData,
});
export const createProductCategorySuccess = (data: any) => ({
  type: CREATE_PRODUCT_CATEGORY_SUCCESS,
  payload: data,
});
export const createProductCategoryFailure = (error: string) => ({
  type: CREATE_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

export const deleteProductCategoryRequest = (categoryId: string) => ({
  type: DELETE_PRODUCT_CATEGORY_REQUEST,
  payload: categoryId,
});
export const deleteProductCategorySuccess = (data: any) => ({
  type: DELETE_PRODUCT_CATEGORY_SUCCESS,
  payload: data,
});
export const deleteProductCategoryFailure = (error: string) => ({
  type: DELETE_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

// Product Tag Actions
export const getProductTagsRequest = (payload: {
  page?: number;
  limit?: number;
  search?: string;
}) => ({
  type: GET_PRODUCT_TAGS_REQUEST,
  payload,
});
export const getProductTagsSuccess = (data: any) => ({
  type: GET_PRODUCT_TAGS_SUCCESS,
  payload: data,
});
export const getProductTagsFailure = (error: string) => ({
  type: GET_PRODUCT_TAGS_FAILURE,
  payload: error,
});

export const createProductTagRequest = (data: { name: string; description: string }) => ({
  type: CREATE_PRODUCT_TAG_REQUEST,
  payload: data,
});
export const createProductTagSuccess = (data: any) => ({
  type: CREATE_PRODUCT_TAG_SUCCESS,
  payload: data,
});
export const createProductTagFailure = (error: string) => ({
  type: CREATE_PRODUCT_TAG_FAILURE,
  payload: error,
});

export const deleteProductTagRequest = (tagId: string) => ({
  type: DELETE_PRODUCT_TAG_REQUEST,
  payload: tagId,
});
export const deleteProductTagSuccess = (data: any) => ({
  type: DELETE_PRODUCT_TAG_SUCCESS,
  payload: data,
});
export const deleteProductTagFailure = (error: string) => ({
  type: DELETE_PRODUCT_TAG_FAILURE,
  payload: error,
});