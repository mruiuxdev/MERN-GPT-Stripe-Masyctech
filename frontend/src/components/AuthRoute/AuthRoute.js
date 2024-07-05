import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../AuthContext/AuthContext";
import { ModelMessage } from "../Alert/ModelMessage";

export const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isError } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <ModelMessage message="Checking authentication status, please wait..." />
    );
  }

  if (isError || isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
