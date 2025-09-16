import axios from "axios";
import { BASE_URL } from "./apiRoutes";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log('🔵 API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data ?? null,
      params: config.params,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      (response.data.logout ||
        response.data.message === "Access denied")
    ) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Redirecting to login."));
    }
    return response;
  },
  (error) => {
    const isUnauthorized = error.response && error.response.status === 401;
    const isLogout =
      error.response && error.response.data && error.response.data.logout;
    const isAccessDenied =
      error.response &&
      error.response.data &&
      error.response.data.message === "Access denied";

    if (isUnauthorized || isLogout || isAccessDenied) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Redirecting to login."));
    }
    return Promise.reject(error);
  }
);

export const postRequest = async (
  url: string,
  payload: any,
  headers: Record<string, string> = {}
) => {
  try {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    const response = await api.post(url, payload, {
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in postRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};

export const getRequest = async (
  url: string,
  params: any = null,
  config: any = {}
) => {
  try {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
      params: params,
      ...config,
    };
    const response = await api.get(url, axiosConfig);
    if (axiosConfig.responseType === "blob") {
      return response;
    }
    return response.data;
  } catch (error: any) {
    console.error("Error in getRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};

export const putRequest = async (url: string, data: any, config: any = {}) => {
  try {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    const response = await api.put(url, data, {
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(config.headers || {}),
      },
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in putRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};
export const patchRequest = async (
  url: string,
  data: any = {},
  config: any = {}
) => {
  try {
    const response = await api.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in patchRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};

export const deleteRequest = async (
  url: string,
  data: any = {},
  config: any = {}
) => {
  try {
    const response = await api.delete(url, {
      headers: {
        ...config.headers,
      },
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in deleteRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};