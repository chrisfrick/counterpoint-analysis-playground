import { AbcNotation, Interval, Scale } from 'tonal';
import { Music, Voice } from './types';
import {
  calculateIntervals,
  calculateMotion,
} from './firstSpeciesHarmonicAnalysis';
import { isTritone } from './utils';

export const firstSpeciesToAbc = (music: Music) => {
  const scaleName = music.key.includes('m')
    ? `${music.key} minor`
    : `${music.key} major`;
  const diatonicNotes = Scale.get(scaleName).notes;

  // Add notes for voice2
  let voice2Abc = '';
  music.voice2.measures.forEach((measure, measureIndex) => {
    measure.notes.forEach((note, noteIndex) => {
      if (noteIndex === 0 && measureIndex !== 0) {
        voice2Abc = voice2Abc.concat('|');
      }
      // TODO: Add stripping of accidental IF the note is diatonic
      voice2Abc = voice2Abc.concat(
        AbcNotation.scientificToAbcNotation(note.pitch),
        note.duration,
        ' '
      );
    });
  });

  let voice1Abc = '';
  music.voice1.measures.forEach((measure, measureIndex) => {
    measure.notes.forEach((note, noteIndex) => {
      if (noteIndex === 0 && measureIndex !== 0) {
        voice1Abc = voice1Abc.concat('|');
      }
      // Check for tritones
      if (
        isTritone(
          Interval.simplify(
            Interval.distance(
              music.voice2.measures[measureIndex]?.notes[noteIndex]?.pitch,
              music.voice1.measures[measureIndex]?.notes[noteIndex]?.pitch
            )
          )
        )
      ) {
        voice1Abc = voice1Abc.concat(`"^tritone!"`);
      }
      voice1Abc = voice1Abc.concat(
        AbcNotation.scientificToAbcNotation(note.pitch),
        note.duration,
        ' '
      );
    });
  });

  // Add motion notation below voice1
  const motion = calculateMotion(music);
  console.log(motion);

  return {
    voice1Abc,
    voice2Abc,
  };
};

export const musicObjectToAbcNotation = (musicObject: Music) => {
  const voice1 = musicObject.voice1;
  const voice2 = musicObject.voice2;

  const cantus = musicObject.voice2.cantus ? voice2 : voice1;

  const abcObject = firstSpeciesToAbc(musicObject);
  const abcNotation = `
M: ${musicObject.timeSignature}
L: 1
K: ${musicObject.key}
%%staves [v1, v2]
V: v1 clef="${voice1.clef}"
V: v2 clef="${voice2.clef}"
[V: v1] ${abcObject.voice1Abc}|]
w: ${calculateIntervals(musicObject)
    .map((i) => i.split('').reverse().join(''))
    .join(' ')}
[V: v2] ${abcObject.voice2Abc}|]
`;
  return abcNotation;
};
