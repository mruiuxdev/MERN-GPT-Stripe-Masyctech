import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthAPI } from "../apis/users/usersApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isError, isLoading, isSuccess, data } = useQuery({
    queryFn: checkAuthAPI,
    queryKey: ["checkAuth"],
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(data);
    }
  }, [isSuccess, data]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
