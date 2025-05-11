import axios from "axios";

const API = "http://localhost:4000/api/auth";

// Ingresar en la base de datos
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`, {
      email,
      password,
    });
    return res.data; // { token: "...", user: { ... } }
  } catch (err) {
    const message = err.res?.data?.message || "Error al iniciar sesión";
    throw new Error(message);
  }
};

export const getUserData = async (token) => {
  try {
    const res = await axios.get(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { user: { nombre, email, role } }
  } catch (err) {
    const message =
    err.response?.data?.message || 'Token inválido o expirado';
  throw new Error(message);
  }
};
