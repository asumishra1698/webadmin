import { ta } from "date-fns/locale";
import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAILURE,
  GET_BLOG_CATEGORY_REQUEST,
  GET_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_FAILURE,
  GET_BLOG_TAG_REQUEST,
  GET_BLOG_TAG_SUCCESS,
  GET_BLOG_TAG_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
  limit: 10,
  categories: {
    categories: [],
    totalCategories: 0,
    page: 1,
    pages: 1,
    limit: 10,
  },
  tags: {
    tags: [],
    totalTags: 0,
    page: 1,
    pages: 1,
    limit: 10,
  },
};

export default function blogReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BLOG_POST_SUCCESS:
      return { ...state, loading: false, blog: action.payload };
    case CREATE_BLOG_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_BLOG_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_BLOG_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        total: action.payload.pagination.total,
        page: action.payload.pagination.page,
        pages: action.payload.pagination.pages,
        limit: action.payload.pagination.limit,
      };
    case GET_ALL_BLOG_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_BLOG_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BLOG_CATEGORY_SUCCESS:      
      return { ...state, loading: false, categories: action.payload };
    case GET_BLOG_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_BLOG_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BLOG_TAG_SUCCESS:
      return { ...state, loading: false, tags: action.payload };
    case GET_BLOG_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}