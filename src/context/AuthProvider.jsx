import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../http/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(() => localStorage.getItem("token"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const logout = () => {
    setToken_(null);
    localStorage.removeItem('token');
  };

  useMemo(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.baseURL = import.meta.env.VITE_API_URL;
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();

          if (window.location.pathname !== '/auth') {
            window.location.pathname = '/auth';
          }         
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
      isAuthenticated: !!token 
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;