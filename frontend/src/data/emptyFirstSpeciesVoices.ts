import { Voice } from '../types';

const lowerVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'bass',
  cantus: false,
  measures: [
    {
      notes: [],
    },
  ],
};

const upperVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'treble',
  cantus: false,
  measures: [
    {
      notes: [],
    },
  ],
};

const emptyFirstSpeciesVoices = { lowerVoice, upperVoice };

export default emptyFirstSpeciesVoices;
