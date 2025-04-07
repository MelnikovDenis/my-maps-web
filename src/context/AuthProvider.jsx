import { createContext, useEffect, useMemo, useState, useRef, useContext } from "react";
import api from "../http/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(() => localStorage.getItem("token"));
  const requestInterceptorRef = useRef(null);
  const responseInterceptorRef = useRef(null);

  const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken_(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken_(null);
  };

  useEffect(() => {
    if (requestInterceptorRef.current !== null) {
      api.interceptors.request.eject(requestInterceptorRef.current);
    }
    if (responseInterceptorRef.current !== null) {
      api.interceptors.response.eject(responseInterceptorRef.current);
    }
    
    if(token)
    {
      requestInterceptorRef.current = api.interceptors.request.use((config) => {
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        config.baseURL = import.meta.env.VITE_API_URL;
        return config;
      });
  
      responseInterceptorRef.current = api.interceptors.response.use(
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
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      setToken,
      logout,
      isAuthenticated: !!token 
    }),
    [token]
  );

  AuthContext.Provider.value = contextValue;

  

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;