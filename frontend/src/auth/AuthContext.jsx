import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      // Debug line inside your isTokenExpired interceptor
      console.log(`Token validation: current=${currentTime}, expires=${decoded.exp}, isExpired=${decoded.exp < currentTime}`);
      return decoded.exp < currentTime;
    } catch (err) {
      return true;
    }
  };

  // Set authentication tokens
  const setAuthTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  // Clear authentication tokens
  const clearAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setCurrentUser(null);
  };

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });

      if (response.data.status === 'success') {
        const { accessToken, refreshToken } = response.data.data;
        const user = response.data.data.user;

        setAuthTokens(accessToken, refreshToken);
        setCurrentUser(user);
        return true;
      }

      return false;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    clearAuthTokens();
  };

  // Refresh token function
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;

    try {
      const response = await api.post('/refresh', { refreshToken });

      if (response.data.status === 'success') {
        const { accessToken: newAccessToken } = response.data.data;
        localStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken);
        return true;
      }

      return false;
    } catch (err) {
      clearAuthTokens();
      return false;
    }
  };

  // // Check authentication on mount
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (!accessToken || !refreshToken) {
  //       clearAuthTokens();
  //       return;
  //     }

  //     if (isTokenExpired(accessToken)) {
  //       // Try to refresh the token
  //       const success = await refreshAccessToken();
  //       if (!success) {
  //         clearAuthTokens();
  //       } else if (accessToken) {
  //         // Set user from token
  //         try {
  //           const decoded = jwtDecode(accessToken);
  //           setCurrentUser({ id: decoded.id, email: decoded.email });
  //         } catch (err) {
  //           clearAuthTokens();
  //         }
  //       }
  //     } else if (accessToken) {
  //       // Set user from token
  //       try {
  //         const decoded = jwtDecode(accessToken);
  //         setCurrentUser({ id: decoded.id, email: decoded.email });
  //       } catch (err) {
  //         clearAuthTokens();
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // Check authentication on location change
  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken || !refreshToken) {
        clearAuthTokens();
        return;
      }

      if (isTokenExpired(accessToken)) {
        // Try to refresh the token
        const success = await refreshAccessToken();
        if (!success) {
          clearAuthTokens();
        } else if (accessToken) {
          // Set user from token
          try {
            const decoded = jwtDecode(accessToken);
            setCurrentUser({ id: decoded.id, email: decoded.email });
          } catch (err) {
            clearAuthTokens();
          }
        }
      } else if (accessToken) {
        // Set user from token
        try {
          const decoded = jwtDecode(accessToken);
          setCurrentUser({ id: decoded.id, email: decoded.email });
        } catch (err) {
          clearAuthTokens();
        }
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Context value
  const value = {
    currentUser,
    accessToken,
    refreshToken,
    isLoading,
    error,
    isAuthenticated: !!currentUser,
    login,
    logout,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};