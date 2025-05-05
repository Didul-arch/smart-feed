import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      // Check if token is expired
      const isTokenExpired = () => {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          return decoded.exp < currentTime;
        } catch (error) {
          return true;
        }
      };
      
      // If token is expired, try to refresh
      if (isTokenExpired()) {
        try {
          // Get refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
          
          // Call refresh endpoint
          const response = await axios.post(`${baseURL}/refresh`, {
            refreshToken
          });
          
          if (response.data.status === 'success') {
            // Update access token in storage
            const newAccessToken = response.data.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            
            // Use new token for current request
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            // Clear tokens if refresh failed
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        } catch (error) {
          // Clear tokens on error
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        // Use existing token
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized, redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;