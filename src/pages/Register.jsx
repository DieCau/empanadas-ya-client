import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // para admins
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre || !email || !password || !confirmarPassword) {
      return toast.error("Todos los campos son obligatorios.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Correo Inválido.");
    }

    if (password !== confirmarPassword) {
      return toast.error("Las contraseñas no coinciden.");
    }

    const role = adminCode === "SECRETO123" ? "admin" : "cliente";

    try {
      const res = await fetch("http://localhost:4000/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al registrar");

      toast.success("Registrado correctamente. Iniciá sesión.");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-semibold mb-6">Registro</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {/* Campo especial para crear admin */}
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          placeholder="Código Admin (opcional)"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
