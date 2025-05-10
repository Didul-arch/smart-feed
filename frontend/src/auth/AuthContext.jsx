import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  const setAuthTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const clearAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setCurrentUser(null);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.status === 'success') {
        const { accessToken, refreshToken, user } = response.data.data;
        setAuthTokens(accessToken, refreshToken);
        setCurrentUser(user);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthTokens();
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const response = await api.post('/refresh', { refreshToken });
      if (response.data.status === 'success') {
        const { accessToken: newAccessToken } = response.data.data;
        setAuthTokens(newAccessToken, refreshToken);
        return true;
      }
      return false;
    } catch {
      clearAuthTokens();
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      if (!accessToken || !refreshToken) {
        clearAuthTokens();
        setIsCheckingAuth(false);
        return;
      }
      if (isTokenExpired(accessToken)) {
        const success = await refreshAccessToken();
        if (!success) {
          clearAuthTokens();
        } else {
          try {
            const decoded = jwtDecode(localStorage.getItem('accessToken'));
            setCurrentUser({ id: decoded.id, email: decoded.email, name: decoded.name });

          } catch {
            clearAuthTokens();
          }
        }
      } else {
        try {
          const decoded = jwtDecode(accessToken);
          setCurrentUser({ id: decoded.id, email: decoded.email, name: decoded.name });
        } catch {
          clearAuthTokens();
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
    // eslint-disable-next-line
  }, [location.pathname]);

  const value = {
    currentUser,
    accessToken,
    refreshToken,
    isLoading,
    error,
    isAuthenticated: !!currentUser,
    isCheckingAuth,
    login,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};