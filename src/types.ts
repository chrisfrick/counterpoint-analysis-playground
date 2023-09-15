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
