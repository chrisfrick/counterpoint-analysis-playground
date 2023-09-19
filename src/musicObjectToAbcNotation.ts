import { AbcNotation, Interval, Scale } from 'tonal';
import { Music, Voice } from './types';
import { extractNotesFromSingleVoice } from './components/Experiments/utils';

export const singleVoiceToAbc = (voice: Voice) => {
  const scaleName = voice.key.includes('m')
    ? `${voice.key} minor`
    : `${voice.key} major`;
  const diatonicNotes = Scale.get(scaleName).notes;

  let output = '';
  voice.measures.forEach((measure, measureIndex) => {
    measure.notes.forEach((note, noteIndex) => {
      if (noteIndex === 0 && measureIndex !== 0) {
        output = output.concat('|');
      }
      // TODO: Add stripping of accidental IF the note is diatonic
      output = output.concat(
        AbcNotation.scientificToAbcNotation(note.pitch),
        note.duration,
        ' '
      );
    });
  });
  return output;
};

const calculateIntervals = (music: Music) => {
  const intervals: string[] = [];
  const voice1Notes = extractNotesFromSingleVoice(music.voice1);
  const voice2Notes = extractNotesFromSingleVoice(music.voice2);
  const shorterVoice =
    voice1Notes.length < voice2Notes.length ? voice1Notes : voice2Notes;
  if (voice2Notes.length > 0 && voice1Notes.length > 0) {
    for (let i = 0; i < shorterVoice.length; i++)
      intervals.push(
        Interval.simplify(
          Interval.distance(voice2Notes[i].pitch, voice1Notes[i].pitch)
        )
      );
  }
  return intervals;
};

export const musicObjectToAbcNotation = (musicObject: Music) => {
  const voice1 = musicObject.voice1;
  const voice2 = musicObject.voice2;

  const cantus = musicObject.voice2.cantus ? voice2 : voice1;

  const abcNotation = `
M: ${musicObject.timeSignature}
L: 1
K: ${musicObject.key}
%%staves [v1, v2]
V: v1 clef="${voice1.clef}"
V: v2 clef="${voice2.clef}"
[V: v1] ${singleVoiceToAbc(voice1)}|]
w: ${calculateIntervals(musicObject)
    .map((i) => i.split('').reverse().join(''))
    .join(' ')}
[V: v2] ${singleVoiceToAbc(voice2)}|]
`;
  return abcNotation;
};
