import { Interval } from 'tonal';
import { Music } from './types';

import {
  calculateMelodicIntervals,
  extractNotesFromSingleVoice,
} from './utils';

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
