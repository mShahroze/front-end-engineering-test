import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createBooking } from '../../services/bookingService';

const BookingForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('');
  const [parcId, setParcId] = useState('');
  const [date, setDate] = useState('');
  const createBookingMutation = useMutation(createBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookings');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBookingMutation.mutate({ userId, parcId, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow"
    >
      <div className="mb-4">
        <label className="block text-gray-700">
          User ID:
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Parc ID:
          <input
            value={parcId}
            onChange={(e) => setParcId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Date:
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
      >
        Add Booking
      </button>
    </form>
  );
};

export default BookingForm;
