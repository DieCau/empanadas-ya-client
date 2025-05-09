import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getPedidos, updateEstadoPedido } from "../api/pedidos";
import ConfirmModal from "../components/ConfirmModal";
import { AuthContext } from "../context/AuthContext";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [zona, setZona] = useState("todas");
  const [estado, setEstado] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user) return; // 🛡️ Protege si user es null
     
      try {
        const data = await getPedidos(user.token);
        setPedidos(data);
      } catch (error) {
        console.error("Error al traer pedidos:", error);
      }
    };
    fetchPedidos();
  }, [user]);
  

  const pedidosFiltrados = useMemo(() => {
    return pedidos
      .filter((pedido) => {
        return zona === "todas" || pedido.zona === zona;
      })
      .filter((pedido) => {
        return estado === "todos" || pedido.estado === estado;
      });
  }, [pedidos, zona, estado]);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await updateEstadoPedido(id, nuevoEstado, user.token);
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
      );
      toast.success(`Pedido ${id} marcado como ${nuevoEstado}`);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("Error al actualizar el estado");
    }
  };

  const confirmarCambio = async () => {
    if (!pedidoSeleccionado) return;
    const nuevoEstado =
      pedidoSeleccionado.estado === "pendiente" ? "entregado" : "pendiente";
    try {
      await updateEstadoPedido(pedidoSeleccionado.id, nuevoEstado, user.token);
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoSeleccionado.id ? { ...p, estado: nuevoEstado } : p
        )
      );
      toast.success(
        `Pedido ${pedidoSeleccionado.id} marcado como ${nuevoEstado}`
      );
    } catch (error) {
      toast.error("Error al actualizar el estado", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administración de Pedidos</h1>
      <p>Hola, {user?.nombre}.</p> 
      <p>Aquí podés gestionar pedidos o usuarios.</p>

      <div className="flex gap-4 m-4">
        <select
          className="border p-2"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
        >
          <option value="todas">Todas las zonas</option>
          <option value="Tafí del Valle">Tafí del Valle</option>
          <option value="Cafayate">Cafayate</option>
          <option value="Amaicha">Amaicha</option>
        </select>

        <select
          className="border p-2"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="entregado">Entregados</option>
        </select>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Zona</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.cliente}</td>
              <td className="border p-2">{p.zona}</td>
              <td className="border p-2">{p.estado}</td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setPedidoSeleccionado(p);
                    setModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Marcar como{" "}
                  {p.estado === "pendiente" ? "entregado" : "pendiente"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmarCambio}
        mensaje={`¿Estás seguro de marcar el pedido #${
          pedidoSeleccionado?.id
        } como ${
          pedidoSeleccionado?.estado === "pendiente" ? "entregado" : "pendiente"
        }?`}
      />
    </div>
  );
}
