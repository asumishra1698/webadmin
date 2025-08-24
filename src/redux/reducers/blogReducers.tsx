import {
  // Blog post reducer
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAILURE,
  DELETE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAILURE,
  UPDATE_BLOG_STATUS_REQUEST,
  UPDATE_BLOG_STATUS_SUCCESS,
  UPDATE_BLOG_STATUS_FAILURE,

  // Blog category reducer
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_SUCCESS,
  CREATE_BLOG_CATEGORY_FAILURE,
  GET_BLOG_CATEGORY_REQUEST,
  GET_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_FAILURE,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAILURE,

  // Blog tag reducer
  CREATE_BLOG_TAG_REQUEST,
  CREATE_BLOG_TAG_SUCCESS,
  CREATE_BLOG_TAG_FAILURE,
  GET_BLOG_TAG_REQUEST,
  GET_BLOG_TAG_SUCCESS,
  GET_BLOG_TAG_FAILURE,
  DELETE_BLOG_TAG_REQUEST,
  DELETE_BLOG_TAG_SUCCESS,
  DELETE_BLOG_TAG_FAILURE,
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
  blogtags: {
    blogTags: [],
    totalTags: 0,
    page: 1,
    pages: 1,
    limit: 10,
  },
};

export default function blogReducer(state = initialState, action: any) {
  switch (action.type) {
    // Blog post reducer
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
    case DELETE_BLOG_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post: any) => post._id !== action.payload),
      };
    case DELETE_BLOG_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_BLOG_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_BLOG_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post: any) =>
          post._id === action.payload.id
            ? { ...post, status: action.payload.status }
            : post
        ),
      };
    case UPDATE_BLOG_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Blog category reducer

    case CREATE_BLOG_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: {
          ...state.categories,
          categories: [...state.categories.categories, action.payload],
        },
      };
    case CREATE_BLOG_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_BLOG_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BLOG_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case GET_BLOG_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_BLOG_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: {
          ...state.categories,
          categories: state.categories.categories.filter(
            (category: any) => category._id !== action.payload
          ),
        },
      };
    case DELETE_BLOG_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Blog tag reducer

    case CREATE_BLOG_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BLOG_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogtags: {
          ...state.blogtags,
          blogTags: [...state.blogtags.blogTags, action.payload],
        },
      };
    case CREATE_BLOG_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_BLOG_TAG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BLOG_TAG_SUCCESS:
      return {
        ...state,
        blogtags: {
          ...state.blogtags,
          blogTags: Array.isArray(action.payload.blogTags)
            ? action.payload.blogTags
            : [],
          totalTags: action.payload.totalTags || 0,
          page: action.payload.page || 1,
          pages: action.payload.pages || 1,
          limit: action.payload.limit || 10,
          loading: false,
          error: null,
        },
        loading: false, // <-- add this line
        error: null,
      };
    case GET_BLOG_TAG_FAILURE:
      return {
        ...state,
        blogtags: {
          ...state.blogtags,
          loading: false,
          error: action.payload,
        },
        loading: false, // <-- add this line
        error: action.payload,
      };

    case DELETE_BLOG_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_BLOG_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogtags: {
          ...state.blogtags,
          blogTags: state.blogtags.blogTags.filter(
            (tag: any) => tag._id !== action.payload
          ),
        },
      };
    case DELETE_BLOG_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
