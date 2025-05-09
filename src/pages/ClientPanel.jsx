import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ClientPanel() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Podés hacer fetch de pedidos aquí
    if (user) {
        console.log("Usuario en ClientPanel:", user);
    }
  }, [user]); // Dependencia de useEffect en user

  const saludo = useMemo(() => {
      if (user) {
        return `Bienvenido ${user.nombre}`;
      }
      return "Bienvenido"; // O un valor por defecto
  }, [user]);

  if (!user) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{saludo}</h1>
      <p>Este es tu panel de cliente</p>
    </div>
  );
}
