import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function ClientPanel() {
  const { user, token } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:4000/api/productos', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setProductos(res.data));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bienvenido {user?.nombre}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-xl p-4 shadow">
            <h2 className="font-semibold text-lg">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="font-bold mt-2">${producto.precio}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <Link to="/carrito">
        <button className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
          Ver carrito
        </button>
      </Link>
    </div>
  );
}
