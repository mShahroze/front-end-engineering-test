import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchUserById } from '../services/userService';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, error, isLoading } = useQuery(['user', id], () =>
    id ? fetchUserById(id) : Promise.resolve(null)
  );

  if (!id) return <div>No user ID specified</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {data.id}</p>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default UserDetail;
