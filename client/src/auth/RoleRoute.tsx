import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRoute = ({ children, role }: { children: JSX.Element; role: string }) => {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (userRole !== role) return <Navigate to="/dashboard" />;

  return children;
};

export default RoleRoute;
