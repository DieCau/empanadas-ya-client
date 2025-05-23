import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleCompra = async () => {
    const API = "http://localhost:4000/api/ordenes";
    try {
      const res = await axios.post(
        API,
        {
          productos: cartItems,
          direccion_envio: direccion,
          metodo_pago: metodoPago,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Orden creada con éxito. ID: " + res.data.orden_id);
      navigate("/cliente");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al generar la orden.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tu carrito</h1>

      {cartItems.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">Tu carrito está vacío.</p>
          <Link to="/cliente">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Volver a comprar
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.nombre}</h2>
                <p>Cantidad: {item.cantidad}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">${item.precio * item.cantidad}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg">Total: ${total}</div>

          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Dirección de envío"
              className="w-full p-2 border rounded"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="efectivo">Efectivo</option>
              <option value="mercado_pago">Mercado Pago</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
            <button
              onClick={handleCompra}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirmar compra
            </button>
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <Link to="/cliente" className="w-1/2">
              <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
                Seguir comprando
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
