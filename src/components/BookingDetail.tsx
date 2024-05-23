import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchBookingById } from '../services/bookingService';

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, error, isLoading } = useQuery(['booking', id], () =>
    id ? fetchBookingById(id) : Promise.resolve(null)
  );

  if (!id) return <div>No booking ID specified</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h2>Booking Details</h2>
      <p>ID: {data.id}</p>
      <p>User ID: {data.userId}</p>
      <p>Parc ID: {data.parcId}</p>
      <p>Date: {data.date}</p>
    </div>
  );
};

export default BookingDetail;
