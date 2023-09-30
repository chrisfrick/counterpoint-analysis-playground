import {
  calculateIntervals,
  calculateMotion,
} from './firstSpeciesHarmonicAnalysis';
import { Voice } from './types';

const exampleLowerVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'bass',
  cantus: false,
  measures: [
    {
      notes: [
        {
          pitch: 'C3',
          duration: '1/2',
        },
        {
          pitch: 'D3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E3',
          duration: '1/2',
        },
        {
          pitch: 'F3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G3',
          duration: '1/2',
        },
        {
          pitch: 'F3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E3',
          duration: '1/2',
        },
        {
          pitch: 'D3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'C3',
          duration: '1',
        },
      ],
    },
  ],
};

const exampleUpperVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'treble',
  cantus: false,
  measures: [
    {
      notes: [
        {
          pitch: 'C5',
          duration: '1/2',
        },
        {
          pitch: 'B4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G4',
          duration: '1/2',
        },
        {
          pitch: 'A4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G4',
          duration: '1/2',
        },
        {
          pitch: 'A4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'B4',
          duration: '1/2',
        },
        {
          pitch: 'B4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'C5',
          duration: '1',
        },
      ],
    },
  ],
};

const music = {
  key: 'C',
  timeSignature: '4/4',
  voice1: exampleUpperVoice,
  voice2: exampleLowerVoice,
};

describe('calculateIntervals', () => {
  test('returns appropriate interval array', () => {
    expect(calculateIntervals(music)).toEqual({
      intervals: ['8P', '6M', '3m', '3M', '8P', '3M', '5P', '6M', '8P'],
      errors: {},
    });
  });
});
