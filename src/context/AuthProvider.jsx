import { useEffect, useState } from "react";
import { getUserData } from "../api/auth";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [token, setToken] = useState(null);


  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    setToken(token); 
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        setToken(token);
        // Llamá al backend para validar y obtener el user
        getUserData(token)
          .then((data) => {
            setUser(data.user);
          })
          .catch(() => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
          });
      }
    } catch (error) {
      console.error("Error al analizar los Datos", error);
      // Podrías establecer un valor de error en el estado aquí si lo deseas.
    } finally {
      setLoading(false); // Marcamos la carga como completada, incluso si hay un error
    }
  }, []);


  // Mientras se carga el usuario, mostramos un indicador de carga
  if (loading) {
    return <div>Cargando...</div>; // O un componente de carga más sofisticado
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
