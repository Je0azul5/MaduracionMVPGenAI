import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

axios.defaults.withCredentials = true;

export const createLibrary = async (libraryData) => {
  try {
    const response = await axios.post(`${API_URL}/libraries`, libraryData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Sesión expirada, por favor inicie sesión nuevamente');
    }
    if (error.response?.status === 403) {
      throw new Error('No tiene permisos para realizar esta acción');
    }
    throw new Error(error.response?.data?.message || 'Error al crear la biblioteca');
  }
};