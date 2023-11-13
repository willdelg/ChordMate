import HttpError from '@wasp/core/HttpError.js'

export const getSong = async ({ songId }, context) => {
  const song = await context.entities.Song.findUnique({
    where: { id: songId },
    include: { chords: true }
  });

  if (!song) throw new HttpError(404, 'No song with id ' + songId);

  return song;
}

export const getUserPreferences = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: userId },
    include: { preferences: true }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + userId);

  return user.preferences;
}