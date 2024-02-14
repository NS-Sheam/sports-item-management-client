import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type TPrivateRouteProps = {
  children: React.ReactNode;
  userRole: string[];
};

const PrivateRoute = ({ userRole, children }: TPrivateRouteProps) => {
  const role = useAppSelector((state) => state.auth.user?.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!userRole.includes(role as string)) {
    dispatch(removeUser());
    navigate("/auth");
  }
  return children;
};

export default PrivateRoute;
