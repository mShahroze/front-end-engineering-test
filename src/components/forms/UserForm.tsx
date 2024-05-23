import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../../services/userService';

const UserForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({ name, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
