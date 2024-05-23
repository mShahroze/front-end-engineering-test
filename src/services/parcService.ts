import { AxiosError } from 'axios';
import api from '../api';

export const fetchParcs = async () => {
  try {
    const response = await api.get('/parcs');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${error.response.data.message}`
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createParc = async (parc: {
  name: string;
  location: string;
}) => {
  const response = await api.post('/parcs', parc);
  return response.data;
};

export const fetchParcById = async (id: string) => {
  const response = await api.get(`/parcs/${id}`);
  return response.data;
};

export const deleteParc = async (id: string) => {
  const response = await api.delete(`/parcs/${id}`);
  return response.data;
};
