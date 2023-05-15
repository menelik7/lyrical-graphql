import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import query from '../queries/songDetail';
import LyricCreate from './LyricCreate';

export default function SongDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(query, { variables: { id } });

  if (loading) return;
  if (error) return <p>Error: {error.message}</p>;

  const { song } = data;
  const { title, lyrics } = song;
  const renderLyrics = lyrics.map(({ content }, i) => {
    return <div key={i}>{content}</div>;
  });

  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <Link to='/'>
          <i className='material-icons'>home</i>
        </Link>
      </div>
      <h3>{title}</h3>
      {renderLyrics}
      <LyricCreate songId={id} />
    </div>
  );
}
