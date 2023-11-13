import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserPreferences from '@wasp/queries/getUserPreferences';
import updatePreferences from '@wasp/actions/updatePreferences';

export function PreferencesPage() {
  const { data: preferences, isLoading, error } = useQuery(getUserPreferences);
  const updatePreferencesFn = useAction(updatePreferences);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdatePreferences = (newPreferences) => {
    updatePreferencesFn(newPreferences);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Preferences</h1>
      <div className='flex flex-col gap-y-4'>
        <div>
          <label className='font-bold'>Tempo:</label>
          <input
            type='number'
            value={preferences.tempo}
            onChange={(e) => handleUpdatePreferences({ tempo: e.target.value })}
            className='border rounded p-2'
          />
        </div>
        <div>
          <label className='font-bold'>Tuning:</label>
          <input
            type='text'
            value={preferences.tuning}
            onChange={(e) => handleUpdatePreferences({ tuning: e.target.value })}
            className='border rounded p-2'
          />
        </div>
        <div>
          <label className='font-bold'>Volume:</label>
          <input
            type='number'
            value={preferences.volume}
            onChange={(e) => handleUpdatePreferences({ volume: e.target.value })}
            className='border rounded p-2'
          />
        </div>
      </div>
      <Link to='/' className='text-blue-500'>Go to Home</Link>
    </div>
  );
}