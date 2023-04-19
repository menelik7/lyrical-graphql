import React, { useState } from 'react';

export default function SongCreate() {
  const [title, setTitle] = useState('');

  return (
    <div>
      <div>Create a New Song</div>
      <form>
        <label>Song title</label>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </form>
    </div>
  );
}
