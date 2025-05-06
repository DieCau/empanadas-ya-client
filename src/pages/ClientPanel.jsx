import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ClientPanel() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Podés hacer fetch de pedidos aquí
  }, []);

  const saludo = useMemo(() => `Bienvenido ${user?.name}`, [user]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{saludo}</h1>
      <p>Este es tu panel de cliente</p>
    </div>
  );
}
