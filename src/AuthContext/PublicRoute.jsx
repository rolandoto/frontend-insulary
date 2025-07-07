import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PublicRoute({ children }) {
  const { accessToken } = useSelector((state) => state.Refrestoken);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}