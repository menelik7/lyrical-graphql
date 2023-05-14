import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs';

export default function SongCreate() {
  const [title, setTitle] = useState('');
  const [createSong, { loading, error }] = useMutation(CREATE_SONG);
  const navigate = useNavigate();

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const onSubmit = (event) => {
    event.preventDefault();
    createSong({
      variables: { title },
      refetchQueries: [{ query }],
    }).then(() => {
      setTitle('');
      navigate('/');
    });
  };

  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <Link to='/'>
          <i className='material-icons'>home</i>
        </Link>
      </div>
      <h4>Create a New Song</h4>
      <form onSubmit={onSubmit}>
        <label>Song title</label>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

const CREATE_SONG = gql`
  mutation CreateSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;
