import {
  // Blog post
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAILURE,
  DELETE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAILURE,

  // Blog category
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_SUCCESS,
  CREATE_BLOG_CATEGORY_FAILURE,
  GET_BLOG_CATEGORY_REQUEST,
  GET_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_FAILURE,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAILURE,

  // Blog tag
  CREATE_BLOG_TAG_REQUEST,
  CREATE_BLOG_TAG_SUCCESS,
  CREATE_BLOG_TAG_FAILURE,
  GET_BLOG_TAG_REQUEST,
  GET_BLOG_TAG_SUCCESS,
  GET_BLOG_TAG_FAILURE,
  DELETE_BLOG_TAG_REQUEST,
  DELETE_BLOG_TAG_SUCCESS,
  DELETE_BLOG_TAG_FAILURE,
} from "./actionTypes";


// Blog post actions
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

export const deleteBlogPostRequest = (id: string) => ({
  type: DELETE_BLOG_POST_REQUEST,
  payload: id,
});

export const deleteBlogPostSuccess = (id: string) => ({
  type: DELETE_BLOG_POST_SUCCESS,
  payload: id,
});

export const deleteBlogPostFailure = (error: string) => ({
  type: DELETE_BLOG_POST_FAILURE,
  payload: error,
});

// Blog category actions

export const createBlogCategoryRequest = (category: {
  name: string;
  parent: string;
}) => ({
  type: CREATE_BLOG_CATEGORY_REQUEST,
  payload: category,
});

export const createBlogCategorySuccess = (data: any) => ({
  type: CREATE_BLOG_CATEGORY_SUCCESS,
  payload: data,
});

export const createBlogCategoryFailure = (error: string) => ({
  type: CREATE_BLOG_CATEGORY_FAILURE,
  payload: error,
});

export const getBlogCategoryRequest = (payload: {
  page: number;
  limit: number;
  search: string;
}) => ({
  type: GET_BLOG_CATEGORY_REQUEST,
  payload,
});

export const getBlogCategorySuccess = (data: any) => ({
  type: GET_BLOG_CATEGORY_SUCCESS,
  payload: data,
});

export const getBlogCategoryFailure = (error: string) => ({
  type: GET_BLOG_CATEGORY_FAILURE,
  payload: error,
});

export const deleteBlogCategoryRequest = (id: string) => ({
  type: DELETE_BLOG_CATEGORY_REQUEST,
  payload: id,
});

export const deleteBlogCategorySuccess = (id: string) => ({
  type: DELETE_BLOG_CATEGORY_SUCCESS,
  payload: id,
});

export const deleteBlogCategoryFailure = (error: string) => ({
  type: DELETE_BLOG_CATEGORY_FAILURE,
  payload: error,
});

// Blog tag actions

export const createBlogTagRequest = (tag: { name: string }) => ({
  type: CREATE_BLOG_TAG_REQUEST,
  payload: tag,
});

export const createBlogTagSuccess = (data: any) => ({
  type: CREATE_BLOG_TAG_SUCCESS,
  payload: data,
});

export const createBlogTagFailure = (error: string) => ({
  type: CREATE_BLOG_TAG_FAILURE,
  payload: error,
});

export const getBlogTagRequest = (payload: {
  page: number;
  limit: number;
  search: string;
}) => ({
  type: GET_BLOG_TAG_REQUEST,
  payload,
});

export const getBlogTagSuccess = (data: any) => ({
  type: GET_BLOG_TAG_SUCCESS,
  payload: data,
});

export const getBlogTagFailure = (error: string) => ({
  type: GET_BLOG_TAG_FAILURE,
  payload: error,
});

export const deleteBlogTagRequest = (id: string) => ({
  type: DELETE_BLOG_TAG_REQUEST,
  payload: id,
});

export const deleteBlogTagSuccess = (id: string) => ({
  type: DELETE_BLOG_TAG_SUCCESS,
  payload: id,
});

export const deleteBlogTagFailure = (error: string) => ({
  type: DELETE_BLOG_TAG_FAILURE,
  payload: error,
});
