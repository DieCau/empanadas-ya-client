import axios from 'axios';

const API = 'http://localhost:4000/api/pedidos';

export const getPedidos = async (token) => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const updateEstadoPedido = async (id, estado, token) => {
  const res = await axios.put(`http://localhost:4000/api/pedidos/${id}`, 
    { estado },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};
