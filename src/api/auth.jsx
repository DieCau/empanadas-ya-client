import axios from 'axios';

const API = 'http://localhost:4000/api/auth';

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`, {
      email,
      password,
    });
    return res.data; // { token: "...", user: { ... } }
  } catch (err) {
    throw new Error("Credenciales incorrectas", err);
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
    throw new Error("Token inválido o expirado", err);
  }
};