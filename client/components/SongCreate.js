import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export default function SongCreate() {
  const [title, setTitle] = useState('');
  const [createSong, { data, loading, error }] = useMutation(CREATE_SONG);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const onSubmit = (event) => {
    event.preventDefault();
    createSong({ variables: { title } });
    setTitle('');
  };

  return (
    <div>
      <div>Create a New Song</div>
      <form onSubmit={onSubmit}>
        <label>Song title</label>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
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
