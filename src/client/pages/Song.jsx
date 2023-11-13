import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getSong from '@wasp/queries/getSong';
import updatePreferences from '@wasp/actions/updatePreferences';

export function SongPage() {
  const { songId } = useParams();
  const { data: song, isLoading, error } = useQuery(getSong, { songId });
  const updatePreferencesFn = useAction(updatePreferences);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>{song.title}</h1>
      <h2 className='text-xl font-bold mb-2'>{song.artist}</h2>
      <div className='mb-4'>
        <button
          onClick={() => updatePreferencesFn({ tempo: song.tempo })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Set Tempo
        </button>
      </div>
      <div className='mb-4'>
        <button
          onClick={() => updatePreferencesFn({ tuning: song.tuning })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Set Tuning
        </button>
      </div>
      <div className='mb-4'>
        <button
          onClick={() => updatePreferencesFn({ volume: song.volume })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Set Volume
        </button>
      </div>
      <div>
        {song.chords.map((chord) => (
          <div key={chord.id} className='mb-2'>
            {chord.name} - {chord.position}
          </div>
        ))}
      </div>
    </div>
  );
}