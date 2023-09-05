import { Interval, AbcNotation } from 'tonal';

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

// Example of what the counterpointObject needs to look like

const counterpointObject = {
  voice1: [],
  voice2: [],
  intervals: [],
  motion: [], // Motion from beat to beat
};
