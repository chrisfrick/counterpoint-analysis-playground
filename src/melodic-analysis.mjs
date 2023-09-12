import { Scale, Note, Range } from 'tonal';

/* Input melody */

const melody = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'treble',
  measures: [
    {
      notes: [
        {
          pitch: 'C4',
          duration: 'h',
        },
        {
          pitch: 'D4',
          duration: 'h',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E4',
          duration: 'h',
        },
        {
          pitch: 'F4',
          duration: 'h',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E4',
          duration: 'h',
        },
        {
          pitch: 'D4',
          duration: 'h',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'C5',
          duration: 'w',
        },
      ],
    },
  ],
};

const usesCadenceFormula = (notes, key) => {
  const scale = Scale.degrees(key + ' major');
  const lastThreeNotes = notes.slice(-3);

  // Check that last note is 'do'
  if (Note.pitchClass(lastThreeNotes[2]) !== scale(1)) {
    return false;
  }

  const scaleInCorrectOctave = Scale.degrees(lastThreeNotes[2] + ' major');

  const cadenceFormulas = [
    [3, 2, 1],
    [-2, -1, 1],
    [2, 2, 1],
    [-1, -1, 1],
    [2, -1, 1],
    [-1, 2, 1],
    [1, 2, 1],
    [1, -1, 1],
  ];

  const cadenceFormulasAsNotes = cadenceFormulas.map((formula) =>
    formula.map((degree) => {
      return scaleInCorrectOctave(degree);
    })
  );

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((elem, index) => elem === b[index]);

  if (
    cadenceFormulasAsNotes.find((formula) =>
      compareArrays(formula, lastThreeNotes)
    )
  ) {
    return true;
  }

  return false;
};

const rangeIsWithinAnOctave = (notes) => {
  const rangeArr = Range.numeric(notes);
  const max = rangeArr.reduce((max, cur) => Math.max(max, cur));
  const min = rangeArr.reduce((min, cur) => Math.min(min, cur));
  const range = max - min;
  if (range <= 12) return true;
  return false;
};

// TODO: Implement types here!

const melodicAnalysis = (melody) => {
  // Extract notes from melody object
  const notes = melody.measures
    .map((measure) => {
      let notes = measure.notes.map((note) => note.pitch);
      return notes;
    })
    .flat();

  console.log('cadence formula:', usesCadenceFormula(notes, 'C'));
  console.log('range is within an octave', rangeIsWithinAnOctave(notes));
  // Check for mostly stepwise motion
  // Check for leaps >= 4th to reverse by step
  // Check for consecutive leaps

  return;
};

melodicAnalysis(melody);
