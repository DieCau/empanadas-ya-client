import axios from 'axios';

const API = 'http://localhost:4000/api/auth';

export const getUserData = async (token) => {
  try {
    const res = await axios.get(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { user: { ... } }
  } catch (error) {
    throw new Error("Token inválido o expirado", error);
  }
};