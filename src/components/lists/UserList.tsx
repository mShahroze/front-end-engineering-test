import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUsers, deleteUser } from '../../services/userService';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery('users', fetchUsers);
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  const Users = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {Users.map(
          (user: { id: string; name: string; email: string }) => (
            <li key={user.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <span>
                  {user.name} - {user.email}
                </span>
                <button
                  onClick={() => deleteUserMutation.mutate(user.id)}
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

export default UserList;
