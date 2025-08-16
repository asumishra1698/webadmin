import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  blog: null,
};

export default function blogReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BLOG_POST_SUCCESS:
      return { ...state, loading: false, blog: action.payload };
    case CREATE_BLOG_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
