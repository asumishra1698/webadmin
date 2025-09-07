import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DUPLICATE_PRODUCT_REQUEST,
  DUPLICATE_PRODUCT_SUCCESS,
  DUPLICATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,

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

  GET_PRODUCT_BRANDS_REQUEST,
  GET_PRODUCT_BRANDS_SUCCESS,
  GET_PRODUCT_BRANDS_FAILURE,
  CREATE_PRODUCT_BRAND_REQUEST,
  CREATE_PRODUCT_BRAND_SUCCESS,
  CREATE_PRODUCT_BRAND_FAILURE,
  DELETE_PRODUCT_BRAND_REQUEST,
  DELETE_PRODUCT_BRAND_SUCCESS,
  DELETE_PRODUCT_BRAND_FAILURE,
} from "../actions/actionTypes";

interface ProductState {
  products: any[];
  product?: any;
  categories: any[];
  tags: any[];
  brands: any[];
  brandPages?: number;
  total: number;
  page: number;
  pages: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  categories: [],
  tags: [],
  brands: [],
  brandPages: 1,
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

    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
        error: null,
      };
    case CREATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DUPLICATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case DUPLICATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
        error: null,
      };
    case DUPLICATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
        loading: false,
        error: null,
      };
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false,
        error: null,
      };
    case UPDATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload, // <-- store single product here
        loading: false,
        error: null,
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCT_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: Array.isArray(action.payload.categories) ? action.payload.categories : [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        pages: action.payload.pages || 1,
        limit: action.payload.limit || 10,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [action.payload, ...(state.categories || [])],
        loading: false,
        error: null,
      };
    case CREATE_PRODUCT_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
        loading: false,
        error: null,
      };
    case DELETE_PRODUCT_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCT_TAGS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_TAGS_SUCCESS:
      return {
        ...state,
        tags: Array.isArray(action.payload.tags) ? action.payload.tags : [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        pages: action.payload.pages || 1,
        limit: action.payload.limit || 10,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_TAGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_TAG_SUCCESS:
      return {
        ...state,
        tags: [action.payload, ...(state.tags || [])],
        loading: false,
        error: null,
      };
    case CREATE_PRODUCT_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_TAG_SUCCESS:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
        loading: false,
        error: null,
      };
    case DELETE_PRODUCT_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCT_BRANDS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_BRANDS_SUCCESS:
      return {
        ...state,
        brands: Array.isArray(action.payload.brands) ? action.payload.brands : [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        pages: action.payload.pages || 1,
        limit: action.payload.limit || 10,
        brandPages: action.payload.pages || 1,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_BRANDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_BRAND_SUCCESS:
      return {
        ...state,
        brands: [action.payload, ...(state.brands || [])],
        loading: false,
        error: null,
      };
    case CREATE_PRODUCT_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_BRAND_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((brand) => brand.id !== action.payload),
        loading: false,
        error: null,
      };
    case DELETE_PRODUCT_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
