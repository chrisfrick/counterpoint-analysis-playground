import { Interval, AbcNotation } from 'tonal';

export const calculateSingleVoiceMotion = (notes: string[]) => {
  let voiceMotion: number[] = [];
  notes.forEach((note, index, array) => {
    // skip first note
    if (index === 0) return;

    // check for same note
    if (array[index - 1] === note) {
      voiceMotion = [...voiceMotion, 0];
      console.log(voiceMotion);
      return;
    }
    // console.log(Note.midi(AbcNotation.abcToScientificNotation(array[index - 1])))
    let direction = Interval.get(
      Interval.distance(
        AbcNotation.abcToScientificNotation(array[index - 1]),
        AbcNotation.abcToScientificNotation(note)
      )
    ).dir;

    if (direction) {
      voiceMotion = [...voiceMotion, direction];
    }

    console.log(voiceMotion);
  });
  return voiceMotion;
};
