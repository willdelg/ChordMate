import HttpError from '@wasp/core/HttpError.js'

export const uploadSong = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Implement song upload and chord recognition logic here.

  // Save the uploaded song to the database.
  const uploadedSong = await context.entities.Song.create({
    title: args.title,
    artist: args.artist,
    userId: context.user.id
  });

  // Process the uploaded song for chord recognition.
  const chords = await processChords(args.songFile);

  // Save the chords to the database.
  const savedChords = await Promise.all(chords.map(async (chord) => {
    return await context.entities.Chord.create({
      name: chord.name,
      position: chord.position,
      songId: uploadedSong.id
    });
  }));

  return {
    song: uploadedSong,
    chords: savedChords
  };
}

export const updatePreferences = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const updatedPreferences = await context.entities.Preferences.update({
    where: { id: context.user.preferencesId },
    data: args
  });

  return updatedPreferences;
}