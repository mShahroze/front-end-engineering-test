import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchParcs, deleteParc } from '../../services/parcService';

const ParcList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery('parcs', fetchParcs);
  const deleteParcMutation = useMutation(deleteParc, {
    onSuccess: () => {
      queryClient.invalidateQueries('parcs');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error occurred: {(error as Error).message}</div>;

  const Parcs = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Parcs</h1>
      <ul className="space-y-2">
        {Parcs.map(
          (parc: { id: string; name: string; location: string }) => (
            <li key={parc.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                {parc.name} - {parc.location}
                <button
                  onClick={() => deleteParcMutation.mutate(parc.id)}
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

export default ParcList;
