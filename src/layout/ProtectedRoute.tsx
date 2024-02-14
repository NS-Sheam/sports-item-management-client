import { Navigate } from "react-router-dom";
import { currentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace={true}
      />
    );
  }
  return children;
};

export default ProtectedRoute;
