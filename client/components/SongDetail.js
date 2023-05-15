import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import query from '../queries/songDetail';

export default function SongDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(query, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data: ', data);

  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <Link to='/'>
          <i className='material-icons'>home</i>
        </Link>
      </div>
      <h3>Song Detail</h3>
    </div>
  );
}
