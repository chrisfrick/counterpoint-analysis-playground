import { Interval } from 'tonal';
import { Voice, Note as NoteType, Measure } from './types';

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

export const extractNotesFromSingleVoice = (voice: Voice) => {
  const notes = voice.measures
    .map((measure) => {
      return measure.notes;
    })
    .flat();
  return notes;
};

export const isTritone = (interval: string) => {
  if (Interval.get(interval).semitones === 6) {
    return true;
  }
  return false;
};

export const calculateMelodicIntervals = (voice: Voice) => {
  let prevNote: NoteType;
  let currentNote: NoteType;
  const melodicIntervals: string[] = [];

  voice.measures.forEach((measure, measureIndex, measureArr) => {
    measure.notes.forEach((note, noteIndex, noteArr) => {
      if (measureIndex === 0 && noteIndex === 0) {
        currentNote = voice.measures[0].notes[0];
        return;
      }
      prevNote = currentNote;
      currentNote = noteArr[noteIndex];
      const distance = Interval.distance(prevNote.pitch, currentNote.pitch);
      melodicIntervals.push(distance);
    });
  });

  return melodicIntervals;
};
