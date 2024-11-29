import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cacaprecob.onrender.com', // URL da API
});

// Adiciona o token ao header de autorização para todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export const getProdutos = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return []; 
  }
};

export const getProdutoById = async (id) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    }
    console.error('Erro ao buscar produto:', error);
    return null; 
  }
};

export const getSupermercados = async () => {
  try {
    const response = await api.get('/supermercados');
    const supermercados = response.data.reduce((acc, supermercado) => {
      acc[supermercado.id] = supermercado.nome;
      return acc;
    }, {});
    return supermercados;
  } catch (error) {
    console.error('Erro ao buscar supermercados:', error);
    return {};
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get('/produtos/categorias'); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

export default api;
