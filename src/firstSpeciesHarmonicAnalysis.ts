import { Interval } from 'tonal';
import { Music } from './types';

import {
  calculateMelodicIntervals,
  extractNotesFromSingleVoice,
} from './utils';

const counterpointErrors = {
  // measureIndex
  0: {
    // noteIndex
    0: {
      type: 'ParallelOctave',
      message: 'parallel octave',
    },
  },
  1: {},
  2: {},
};

// TODO: Centralize all first species harmonic analysis errors into one location so it can be read and accessed when converting to ABC notation for display
export const calculateMotion = (music: Music) => {
  const voice1Motion = calculateMelodicIntervals(music.voice1);
  const voice2Motion = calculateMelodicIntervals(music.voice2);

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

export const calculateIntervals = (music: Music) => {
  const intervals: string[] = [];
  const voice1Notes = extractNotesFromSingleVoice(music.voice1);
  const voice2Notes = extractNotesFromSingleVoice(music.voice2);
  const shorterVoice =
    voice1Notes.length < voice2Notes.length ? voice1Notes : voice2Notes;
  const errors = {};
  if (voice2Notes.length > 0 && voice1Notes.length > 0) {
    for (let i = 0; i < shorterVoice.length; i++) {
      const interval = Interval.distance(
        voice2Notes[i].pitch,
        voice1Notes[i].pitch
      );
      let simpleInterval = Interval.simplify(interval);
      if (interval !== '1P' && simpleInterval === '1P') {
        simpleInterval = '8P';
      }
      intervals.push(simpleInterval);
    }
  }
  return {
    intervals,
    errors,
  };
};
