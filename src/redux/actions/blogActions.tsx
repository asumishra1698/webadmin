import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
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
