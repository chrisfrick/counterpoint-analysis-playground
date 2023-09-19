import { Scale, Note, Range, Interval } from 'tonal';
import { Error, Note as NoteType, Voice } from './types';
import { extractNotesFromSingleVoice } from './utils';
import { calculateMelodicIntervals } from './utils';

const usesCadenceFormula = (notes: NoteType[], key: string): Error => {
  const scale = Scale.degrees(key + ' major');
  const lastThreeNotes = notes.slice(-3).map((note) => note.pitch);

  // Check that last note is 'do'
  if (Note.pitchClass(lastThreeNotes[2]) !== scale(1)) {
    return {
      type: 'Cadence',
      severity: 3,
      message: 'does not end on tonic',
    };
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

  const compareStrArrays = (a: string[], b: string[]) =>
    a.length === b.length && a.every((elem, index) => elem === b[index]);

  if (
    cadenceFormulasAsNotes.find((formula) =>
      compareStrArrays(formula, lastThreeNotes)
    )
  ) {
    return {
      type: 'Cadence',
      severity: 0,
    };
  }

  return {
    type: 'Cadence',
    severity: 3,
    message: 'does not use a proper cadence formula',
  };
};

const rangeIsWithinAnOctave = (notes: NoteType[]): Error => {
  const rangeArr = Range.numeric(notes.map((note) => note.pitch));
  const max = rangeArr.length
    ? rangeArr.reduce((max, cur) => Math.max(max, cur))
    : 0;
  const min = rangeArr.length
    ? rangeArr.reduce((min, cur) => Math.min(min, cur))
    : 0;
  const range = max - min;
  if (range <= 12) {
    return {
      type: 'Range',
      severity: 0,
    };
  }
  if (range > 12 && range <= 16) {
    return {
      type: 'Range',
      severity: 1,
      message: 'range is larger than an octave',
    };
  }
  if (range > 16) {
    return {
      type: 'Range',
      severity: 3,
      message: 'range is significantly larger than an octave',
    };
  }
  return {
    type: 'Range',
    severity: 0,
  };
};

const usesMostlyStepwiseMotion = (melody: Voice): Error => {
  const melodicIntervals = calculateMelodicIntervals(melody);

  const melodicIntervalNumbers = melodicIntervals.map((interval) => {
    const intNumber = Interval.get(interval).num;
    if (intNumber) {
      return Math.abs(intNumber);
    }
  });
  console.log(melodicIntervalNumbers);

  const intervalCount = melodicIntervalNumbers.length;

  const leapsCount = melodicIntervalNumbers.reduce((leaps, interval) => {
    if (interval && leaps !== undefined && interval > 2) return leaps + 1;
    return leaps;
  }, 0);

  const leapsToStepsRatio = leapsCount ? leapsCount / intervalCount : 0;
  // 25% seems like a good threshold for too many leaps?
  if (leapsToStepsRatio <= 0.25) {
    return {
      type: 'StepwiseMotion',
      severity: 0,
    };
  } else if (leapsToStepsRatio > 0.25 && leapsToStepsRatio <= 0.45) {
    return {
      type: 'StepwiseMotion',
      severity: 1,
      message: 'use mostly stepwise motion',
    };
  } else {
    return {
      type: 'StepwiseMotion',
      severity: 3,
      message: 'too many leaps',
    };
  }
};

const leapsResolveAppropriately = (melody: Voice): Error[] => {
  let prevNote: NoteType;
  let currentNote: NoteType;
  let prevInterval: number | undefined;
  let currentInterval: number | undefined;
  const errors: Error[] = [];

  melody.measures.forEach((measure, measureIndex, measureArr) => {
    measure.notes.forEach((note, noteIndex, noteArr) => {
      if (measureIndex === 0 && noteIndex === 0) {
        currentNote = melody.measures[0].notes[0];
        return;
      }
      prevNote = currentNote;
      currentNote = noteArr[noteIndex];
      prevInterval = currentInterval;
      currentInterval = Interval.get(
        Interval.distance(prevNote.pitch, currentNote.pitch)
      ).num;
      if (prevInterval && Math.abs(prevInterval) >= 4) {
        // Check that signs are different
        if (currentInterval && currentInterval * prevInterval > 0) {
          errors.push({
            type: 'Leaps',
            measureIndex,
            noteIndex,
            severity: 3,
            message: 'must resolve in the opposite direction by step',
          });
        }
        // Check that resolution is by step
        if (currentInterval && Math.abs(currentInterval) > 2) {
          errors.push({
            type: 'Leaps',
            measureIndex,
            noteIndex,
            severity: 3,
            message: 'no consecutive leaps',
          });
        }
      }
    });
  });
  if (errors.length === 0) {
    errors.push({
      type: 'Leaps',
      severity: 0,
    });
  }
  return errors;
};

export const melodicAnalysis = (melody: Voice) => {
  // Extract notes from melody object
  const notes = extractNotesFromSingleVoice(melody);

  const errors = {
    cadenceFormula: usesCadenceFormula(notes, melody.key),
    stepwiseMotion: usesMostlyStepwiseMotion(melody),
    rangeWithinAnOctave: rangeIsWithinAnOctave(notes),
    leapsResolveAppropriately: leapsResolveAppropriately(melody),
  };

  console.log(errors);

  return errors;
};
