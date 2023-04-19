import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import SongList from './SongList';
import SongDetail from './SongDetail';
import SongCreate from './SongCreate';

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <SongList />,
    },
    {
      path: 'song-create',
      element: <SongCreate />,
    },
    {
      path: 'song-detail',
      element: <SongDetail />,
    },
  ]);

  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
}
