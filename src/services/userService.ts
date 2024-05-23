import api from '../api';
import { AxiosError } from 'axios';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
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

export const createUser = async (user: {
  name: string;
  email: string;
}) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
