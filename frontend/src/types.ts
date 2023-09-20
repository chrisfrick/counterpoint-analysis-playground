export interface Note {
  pitch: string;
  duration: string;
}

export interface Measure {
  notes: Note[];
}

export interface Voice {
  key: string;
  timeSignature?: string;
  clef: 'treble' | 'bass';
  cantus: boolean;
  measures: Measure[];
}

export interface Music {
  key: string;
  timeSignature: string;
  voice1: Voice;
  voice2: Voice;
}

export interface Error {
  type: 'Cadence' | 'StepwiseMotion' | 'Range' | 'Leaps';
  measureIndex?: number;
  noteIndex?: number;
  severity: 0 | 1 | 2 | 3;
  message?: string;
}

export interface MelodicErrors {
  cadenceFormula: Error;
  leapsResolveAppropriately: Error[];
  rangeWithinAnOctave: Error;
  stepwiseMotion: Error;
}
