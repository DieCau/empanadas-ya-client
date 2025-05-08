import axios from 'axios';

const API = 'http://localhost:4000/api/auth/login';

export const loginUser = async (email, password) => {
  const res = await axios.post(API, {
    email,
    password,
  });

  return res.data; // { token, user }
};
