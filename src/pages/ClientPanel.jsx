import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function ClientPanel() {
  const { user, token, logout } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const API = "http://localhost:4000/api/productos";

    const getProductos = async () => {
      try {
        const res = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(res.data);
      } catch (err) {
        console.error(
          "Error al obtener productos:",
          err.response?.data || err.message
        );
      }
    };

    if (token) getProductos();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4">Bienvenido {user?.nombre}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-xl p-4 shadow">
            <img src={producto.imagen_url} alt="imagen" />
            <h2 className="font-semibold text-lg">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="font-bold mt-2">${producto.precio}</p>

            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                addToCart(producto);
                toast.success(`${producto.nombre} agregado al carrito`, {
                  position: "bottom-right",
                  autoClose: 2000,
                });
              }}
            >
              Agregar al carrito +
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
