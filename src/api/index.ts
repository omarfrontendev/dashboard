import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 💡 Base URL from environment variables
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // 💡 Get token from localStorage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // 💡 Add Bearer token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 💡 Handle Unauthorized error (e.g., logout user)
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // 💡 Redirect to login
    }
    return Promise.reject(error);
  }
);
