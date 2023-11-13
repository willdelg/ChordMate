import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getSong from '@wasp/queries/getSong';

export function HomePage() {
  const { data: song, isLoading, error } = useQuery(getSong);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>{song.title}</h1>
      <p>{song.artist}</p>
      <ul>
        {song.chords.map((chord) => (
          <li key={chord.id}>{chord.name}</li>
        ))}
      </ul>
      <Link to={`/song/${song.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
        View Song
      </Link>
    </div>
  );
}