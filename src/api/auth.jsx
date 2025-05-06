import axios from 'axios';

const API = 'http://localhost:4000/api/auth';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
};
