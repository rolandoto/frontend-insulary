import { Navigate } from "react-router"
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { accessToken, loadingRegrestoken, errorRefrestoken } = useSelector(
    (state) => state.Refrestoken
  );

  if (loadingRegrestoken) {
    return <div>Cargando sesión...</div>; // Mostramos algo mientras se intenta el refresh
  }

  if (!accessToken && errorRefrestoken) {
    return <Navigate to="/" replace />; // Redirige si no hay token y no se pudo refrescar
  }

  if (accessToken) {
    return <>{children}</>; // Todo bien
  }

  return null; 
} 