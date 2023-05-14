import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

export default function SongList() {
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { songs } = data;
  const displaySongTitles = songs.map(({ id, title }) => {
    return (
      <li className='collection-item' key={id}>
        {title}
      </li>
    );
  });

  return (
    <div>
      <h4>Song List</h4>
      <ul className='collection'>{displaySongTitles}</ul>
      <Link className='btn-floating btn-large red right' to='song-create'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
}
