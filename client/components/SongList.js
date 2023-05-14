import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

export default function SongList() {
  const { loading, error, data } = useQuery(query);
  const [deleteSong, { loading: mutationProcessing, error: mutationError }] =
    useMutation(DELETE_SONG, { refetchQueries: [{ query }] });
  if (loading || mutationProcessing) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error : {error.message}</p>;

  const { songs } = data;
  const onSongDelete = (id) => {
    deleteSong({
      variables: { id },
    });
  };
  const displaySongTitles = songs.map(({ id, title }) => {
    return (
      <li className='collection-item' key={id}>
        {title}
        <i
          style={{ cursor: 'pointer' }}
          className='material-icons right'
          onClick={() => {
            onSongDelete(id);
          }}
        >
          delete
        </i>
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

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
