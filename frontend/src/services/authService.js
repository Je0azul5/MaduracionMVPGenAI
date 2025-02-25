import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

axios.defaults.withCredentials = true;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error de autenticación');
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}; 