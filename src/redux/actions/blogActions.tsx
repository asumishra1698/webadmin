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
} from "./actionTypes";

export const createBlogPostRequest = (formData: FormData) => ({
  type: CREATE_BLOG_POST_REQUEST,
  payload: formData,
});

export const createBlogPostSuccess = (data: any) => ({
  type: CREATE_BLOG_POST_SUCCESS,
  payload: data,
});

export const createBlogPostFailure = (error: string) => ({
  type: CREATE_BLOG_POST_FAILURE,
  payload: error,
});

export const getAllBlogPostsRequest = (payload: {
  page: number;
  limit: number;
  search: string;
}) => ({
  type: GET_ALL_BLOG_POSTS_REQUEST,
  payload,
});

export const getAllBlogPostsSuccess = (data: any) => ({
  type: GET_ALL_BLOG_POSTS_SUCCESS,
  payload: data,
});

export const getAllBlogPostsFailure = (error: string) => ({
  type: GET_ALL_BLOG_POSTS_FAILURE,
  payload: error,
});

export const getBlogCategoryRequest = () => ({
  type: GET_BLOG_CATEGORY_REQUEST,
});

export const getBlogCategorySuccess = (data: any) => ({
  type: GET_BLOG_CATEGORY_SUCCESS,
  payload: data,
});

export const getBlogCategoryFailure = (error: string) => ({
  type: GET_BLOG_CATEGORY_FAILURE,
  payload: error,
});