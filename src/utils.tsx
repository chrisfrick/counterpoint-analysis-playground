import { Interval, AbcNotation, Scale, Note } from 'tonal';
import { Measure } from './types';

export const abcSplit = (abcNotation: string) =>
  abcNotation.split(/(?=[A-Za-z])/);

export const calculateMelodicIntervals = (notes: string[]) => {
  const melodicIntervals: string[] = [];
  notes.forEach((currentNote, index, array) => {
    // Skip first note
    if (index === 0) return;

    const prevNote = array[index - 1];
    const interval = Interval.distance(prevNote, currentNote);

    melodicIntervals.push(interval);
  });
  return melodicIntervals;
};

export const calculateMotion = (voice1: string[], voice2: string[]) => {
  const voice1Motion = calculateMelodicIntervals(voice1);
  const voice2Motion = calculateMelodicIntervals(voice2);

  const motion: string[] = [];

  voice2Motion.forEach((interval, index) => {
    // Check for oblique motion
    const interval1 = Interval.get(voice1Motion[index]);
    const interval2 = Interval.get(interval);
    if (
      Interval.get(interval).num === 1 ||
      Interval.get(voice1Motion[index]).num === 1
    ) {
      motion.push('Oblique');
    } else if (interval1.dir !== interval2.dir) {
      motion.push('Contrary');
    } else if (
      interval1.dir === interval2.dir &&
      interval1.num === interval2.num
    ) {
      motion.push('Parallel');
    } else {
      motion.push('Similar');
    }
  });

  return motion;
};

export const isTritone = (interval: string) => {
  if (Interval.get(interval).semitones === 6) {
    return true;
  }
  return false;
};

export const usesCadenceFormula = (voice: string[], key: string) => {
  const scale = Scale.degrees(key + ' major');
  const lastThreeNotes = voice.slice(-3);

  // Check that last note is 'do'
  if (Note.pitchClass(lastThreeNotes[2]) !== scale(1)) {
    return false;
  }

  const scaleInCorrectOctave = Scale.degrees(lastThreeNotes[2] + ' major');

  const cadenceFormulas = [
    [3, 2, 1],
    [-2, -1, 1],
    [2, 2, 1],
    [-1, -1, 1],
    [2, -1, 1],
    [-1, 2, 1],
    [1, 2, 1],
    [1, -1, 1],
  ];

  const cadenceFormulasAsNotes = cadenceFormulas.map((formula) =>
    formula.map((degree) => {
      return scaleInCorrectOctave(degree);
    })
  );

  const compareArrays = (a: string[], b: string[]) =>
    a.length === b.length && a.every((elem, index) => elem === b[index]);

  if (
    cadenceFormulasAsNotes.find((formula) =>
      compareArrays(formula, lastThreeNotes)
    )
  ) {
    return true;
  }

  return false;
};

export const noteLengthToDecimal = (noteLength: string) => {
  if (Number(noteLength)) {
    return Number(noteLength);
  }
  const split = noteLength.split('/');
  const result = Number(split[0]) / Number(split[1]);
  return result;
};

export const calculateMeasureLength = (measure: Measure) =>
  measure.notes.reduce(
    (measureLength, note) => noteLengthToDecimal(note.duration) + measureLength,
    0
  );
