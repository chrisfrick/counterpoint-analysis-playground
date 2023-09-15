import { AbcNotation, Scale } from 'tonal';
import { Music, Voice } from './types';

const singleVoiceToAbc = (voice: Voice) => {
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
      // TODO: Add stripping if accidental IF the note is diatonic
      output = output.concat(
        AbcNotation.scientificToAbcNotation(note.pitch),
        note.duration,
        ' '
      );
    });
  });
  return output;
};

export const musicObjectToAbcNotation = (musicObject: Music) => {
  console.log(musicObject);
  const voice1 = musicObject.voice1;
  const voice2 = musicObject.voice2;

  const cantus = musicObject.voice2.cantus ? voice2 : voice1;
  console.log(cantus.measures);

  console.log(singleVoiceToAbc(voice1));
  const abcNotation = `
T: Title
C: Composer
M: ${musicObject.timeSignature}
L: 1
K: ${musicObject.key}
%%staves [v1, v2]
V: v1 clef="${voice1.clef}"
V: v2 clef="${voice2.clef}"
[V: v1] ${singleVoiceToAbc(voice1)}|]
w: 1P 6M 4A 5P 3M 6M 6m 6M 1P
[V: v2] ${singleVoiceToAbc(voice2)}|]

`;
  return abcNotation;
};
