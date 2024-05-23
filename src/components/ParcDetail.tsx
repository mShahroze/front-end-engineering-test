import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchParcById } from '../services/parcService';

const ParcDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, error, isLoading } = useQuery(['parc', id], () =>
    id ? fetchParcById(id) : Promise.resolve(null)
  );

  if (!id) return <div>No parc ID specified</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h2>Parc Details</h2>
      <p>ID: {data.id}</p>
      <p>Name: {data.name}</p>
      <p>Location: {data.location}</p>
    </div>
  );
};

export default ParcDetail;
