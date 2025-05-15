import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

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
export const logout = () => api.post('/auth/logout');

export const register = (user) =>
  axios.post('http://localhost:8080/users/create', user);

// ⚠️ CORRIGIDO: Sempre retorna role
export const checkAuth = async () => {
  try {
    const response = await api.get('/auth/check');
    return { authenticated: true, role: response.data.role };
  } catch (error) {
    console.warn("Utilizador não autenticado ou token inválido:", error);
    return { authenticated: false, role: null };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar utilizadores:", error);
    return [];
  }
};

export const updateUserRole = (id, role) =>
  api.put(`/users/${id}/role`, { role });

export const deleteUser = (id) => api.delete(`/users/${id}`);
