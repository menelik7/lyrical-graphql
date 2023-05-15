import '../style/style.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import query from '../queries/songDetail';
import mutation from '../mutations/lyricLike';
import LyricCreate from './LyricCreate';

export default function SongDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(query, { variables: { id } });
  const [likeSong] = useMutation(mutation);

  if (loading) return;
  if (error) return <p>Error: {error.message}</p>;

  const onLike = (id, likes) => {
    likeSong({
      variables: { id },
      optimisticResponse: {
        likeLyric: {
          __typename: 'LyricType',
          id,
          likes: likes + 1,
        },
      },
    });
  };

  const { song } = data;
  const { title, lyrics } = song;
  const renderLyrics = lyrics.map(({ content, id, likes }) => {
    return (
      <div className='lyric-content' key={id}>
        {content}
        <div className='vote-box'>
          <i
            style={{ cursor: 'pointer' }}
            className='material-icons'
            onClick={() => onLike(id, likes)}
          >
            thumb_up
          </i>
          <span>{likes > 0 && likes}</span>
        </div>
      </div>
    );
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
