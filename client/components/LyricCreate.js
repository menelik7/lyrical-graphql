import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import mutation from '../mutations/addLyric';

export default function LyricCreate({ songId }) {
  const [content, setContent] = useState('');
  const [addLyric, { loading, error }] = useMutation(mutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSubmit = (event) => {
    event.preventDefault();
    addLyric({
      variables: {
        content,
        songId,
      },
    });
    setContent('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
      <label>Add a lyric</label>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </form>
  );
}
