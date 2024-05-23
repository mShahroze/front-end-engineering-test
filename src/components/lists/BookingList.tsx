import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchBookings,
  deleteBooking,
} from '../../services/bookingService';

const BookingList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    'bookings',
    fetchBookings
  );
  const deleteBookingMutation = useMutation(deleteBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookings');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  const Bookings = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <ul className="space-y-2">
        {Bookings.map(
          (booking: {
            id: string;
            userId: string;
            parcId: string;
            date: string;
          }) => (
            <li
              key={booking.id}
              className="bg-white p-4 rounded shadow"
            >
              <div className="flex justify-between">
                <span>
                  User ID: {booking.userId} Parc ID: {booking.parcId}
                  Date: {booking.date}
                </span>
                <button
                  onClick={() =>
                    deleteBookingMutation.mutate(booking.id)
                  }
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BookingList;
