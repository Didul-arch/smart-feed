import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Create separate instance for multipart/form-data
const apiMultipart = axios.create({
  baseURL,
  headers: { "Content-Type": "multipart/form-data" },
});

// Request interceptor for JSON API
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Request interceptor for Multipart API
apiMultipart.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle 401
const responseInterceptor = (response) => response;
const errorInterceptor = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

api.interceptors.response.use(responseInterceptor, errorInterceptor);
apiMultipart.interceptors.response.use(responseInterceptor, errorInterceptor);

// Helper function to determine which API instance to use
export const createRequest = (data, type = "json") => {
  if (type === "multipart" || data instanceof FormData) {
    return apiMultipart;
  }
  return api;
};

export { apiMultipart };
export default api;
