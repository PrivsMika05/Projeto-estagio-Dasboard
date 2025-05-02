import axios from 'axios';

const API_BASE = 'http://localhost:8080';

// Criar instância com o token JWT
const api = axios.create({
  baseURL: API_BASE,
});

// Adiciona o token em todas as requisições automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----- Métricas -----
export const getMetrics = async () => {
  try {
    const response = await api.get('/metrics');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
    return [];
  }
};

export const addMetric = (metricData) => api.post('/metrics', metricData);
export const deleteMetric = (id) => api.delete(`/metrics/${id}`);
export const updateMetric = (id, updatedMetric) => api.put(`/metrics/${id}`, updatedMetric);

// ----- Autenticação -----
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (user) => api.post('/users/create', user);

// ----- Gestão de Utilizadores (Admin) -----
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar utilizadores:", error);
    return []; // evita erro .map is not a function
  }
};

export const deleteUser = (id) => api.delete(`/users/${id}`);
