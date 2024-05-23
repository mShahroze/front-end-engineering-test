import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createParc } from '../../services/parcService';

const ParcForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const createParcMutation = useMutation(createParc, {
    onSuccess: () => {
      queryClient.invalidateQueries('parcs');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createParcMutation.mutate({ name, location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow"
    >
      <div className="mb-4">
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Location:
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
      >
        Add Parc
      </button>
    </form>
  );
};

export default ParcForm;
