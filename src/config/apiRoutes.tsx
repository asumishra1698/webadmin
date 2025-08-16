export const BASE_URL = "http://localhost:5000";
export const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export const API_ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",
  RESET_PASSWORD: "/api/auth/reset-password",
  GET_USER_PROFILE: "/api/auth/profile",
  GET_ALL_USERS: "/api/auth/all-users",
  CREATE_BLOG_POST: "/api/blog/posts",
  GET_ALL_BLOG_POSTS: "/api/blog/posts",
  DELETE_BLOG_POST: "/api/blog/posts/",
  CREATE_BLOG_CATEGORY: "/api/blog/categories",
  GET_BLOG_CATEGORY: "/api/blog/categories",
  DELETE_BLOG_CATEGORY: "/api/blog/categories/",
  CREATE_BLOG_TAG: "/api/blog/tags",
  GET_BLOG_TAG: "/api/blog/tags",
  DELETE_BLOG_TAG: "/api/blog/tags/",
};
