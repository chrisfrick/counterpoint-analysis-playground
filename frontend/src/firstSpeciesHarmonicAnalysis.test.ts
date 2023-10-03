import {
  calculateIntervals,
  calculateMotion,
} from './firstSpeciesHarmonicAnalysis';
import { music } from './testData';

describe('calculateMotion', () => {
  test('returns appropriate array', () => {
    expect(calculateMotion(music)).toEqual([
      'Contrary',
      'Contrary',
      'Parallel',
      'Contrary',
      'Contrary',
      'Contrary',
      'Oblique',
      'Contrary',
    ]);
  });
});

describe('calculateIntervals', () => {
  test('returns appropriate interval array', () => {
    expect(calculateIntervals(music)).toEqual({
      intervals: ['8P', '6M', '3m', '3M', '8P', '3M', '5P', '6M', '8P'],
      errors: {},
    });
  });
});
