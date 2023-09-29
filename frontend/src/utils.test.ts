import { Voice } from './types';
import {
  noteLengthToDecimal,
  calculateMeasureLength,
  extractNotesFromSingleVoice,
  isTritone,
  calculateMelodicIntervals,
} from './utils';

describe('extractNotesFromSingleVoice', () => {
  test('returns appropriate array', () => {
    const voice: Voice = {
      key: 'D',
      timeSignature: '4/4',
      clef: 'treble',
      cantus: false,
      measures: [
        {
          notes: [
            { pitch: 'C4', duration: '1/8' },
            { pitch: 'D4', duration: '1/8' },
            { pitch: 'E4', duration: '1/8' },
            { pitch: 'F4', duration: '1/8' },
            { pitch: 'F#4', duration: '1/2' },
          ],
        },
        {
          notes: [
            { pitch: 'G4', duration: '1/4' },
            { pitch: 'Ab4', duration: '1/8' },
            { pitch: 'A4', duration: '1/8' },
            { pitch: 'Bb4', duration: '1/4' },
            { pitch: 'B4', duration: '1/4' },
          ],
        },
      ],
    };

    expect(extractNotesFromSingleVoice(voice)).toEqual([
      { pitch: 'C4', duration: '1/8' },
      { pitch: 'D4', duration: '1/8' },
      { pitch: 'E4', duration: '1/8' },
      { pitch: 'F4', duration: '1/8' },
      { pitch: 'F#4', duration: '1/2' },
      { pitch: 'G4', duration: '1/4' },
      { pitch: 'Ab4', duration: '1/8' },
      { pitch: 'A4', duration: '1/8' },
      { pitch: 'Bb4', duration: '1/4' },
      { pitch: 'B4', duration: '1/4' },
    ]);
  });
});

describe('noteLengthToDecimal', () => {
  test('returns 1 for whole note', () => {
    const noteLength = '1';
    expect(noteLengthToDecimal(noteLength)).toBe(1);
  });

  test('returns 0.5 for half note', () => {
    const noteLength = '1/2';
    expect(noteLengthToDecimal(noteLength)).toBe(0.5);
  });

  test('returns 0.25 for quarter note', () => {
    const noteLength = '1/4';
    expect(noteLengthToDecimal(noteLength)).toBe(0.25);
  });

  test('returns 0.125 for eighth note', () => {
    const noteLength = '1/8';
    expect(noteLengthToDecimal(noteLength)).toBe(0.125);
  });
});

describe('calculateMeasureLength', () => {
  test('returns an appropriate value for an incomplete measure', () => {
    const measure = {
      notes: [
        { pitch: 'C4', duration: '1/4' },
        { pitch: 'C4', duration: '1/2' },
      ],
    };
    expect(calculateMeasureLength(measure)).toBe(0.75);
  });

  test('returns an appropriate value for a complete measure', () => {
    const measure = {
      notes: [
        { pitch: 'C4', duration: '1/4' },
        { pitch: 'C4', duration: '1/8' },
        { pitch: 'C4', duration: '1/8' },
        { pitch: 'C4', duration: '1/2' },
      ],
    };
    expect(calculateMeasureLength(measure)).toBe(1);
  });
});
