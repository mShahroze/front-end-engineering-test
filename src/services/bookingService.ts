import { AxiosError } from 'axios';
import api from '../api';

export const fetchBookings = async () => {
  try {
    const response = await api.get('/bookings');
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

export const createBooking = async (booking: {
  userId: string;
  parcId: string;
  date: string;
}) => {
  const response = await api.post('/bookings', booking);
  return response.data;
};

export const fetchBookingById = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};
