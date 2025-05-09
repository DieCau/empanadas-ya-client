import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />; // Redirige al login si no hay usuario
  }

  return children; // Si está logueado, muestra el componente
}
