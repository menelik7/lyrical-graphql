import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs';

export default function SongList() {
  const { loading, error, data } = useQuery(query);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query }],
  });
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { songs } = data;
  const displaySongTitles = songs.map(({ id, title }) => {
    return (
      <li
        className='collection-item'
        key={id}
        onClick={() => navigate(`song-detail/${id}`)}
      >
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

  const onSongDelete = (id) => {
    deleteSong({
      variables: { id },
    });
  };

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
