import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

export default function SongList() {
  const { loading, error, data } = useQuery(GET_SONG_TITLES);
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
      <div style={{ textAlign: 'right', padding: '0 10px' }}>
        <Link to='song-create'>Create song</Link>
      </div>
    </div>
  );
}

const GET_SONG_TITLES = gql`
  query GetSongTitles {
    songs {
      id
      title
    }
  }
`;
