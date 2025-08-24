import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  total: 0,
  page: 1,
  pages: 1,
  limit: 10,
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: Array.isArray(action.payload.products)
          ? action.payload.products
          : [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        pages: action.payload.pages || 1,
        limit: action.payload.limit || 10,
        loading: false,
        error: null,
      };
    case GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
