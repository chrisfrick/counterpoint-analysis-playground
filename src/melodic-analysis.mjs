import { Scale, Note, Range, Interval } from 'tonal';

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
          pitch: 'C4',
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
    return {
      severity: 0,
      type: 'does not end on tonic',
    };
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
    return { severity: 0 };
  }

  return {
    severity: 2,
    type: 'does not use a proper cadence formula',
  };
};

const rangeIsWithinAnOctave = (notes) => {
  const rangeArr = Range.numeric(notes);
  const max = rangeArr.reduce((max, cur) => Math.max(max, cur));
  const min = rangeArr.reduce((min, cur) => Math.min(min, cur));
  const range = max - min;
  if (range <= 12) {
    return {
      severity: 0,
    };
  }
  if (range > 12 && range <= 16) {
    return {
      severity: 1,
      type: 'range is larger than an octave',
    };
  }
  if (range > 16) {
    return {
      severity: 3,
      type: 'range is significantly larger than an octave',
    };
  }
};

const usesMostlyStepwiseMotion = (melody) => {
  let prevNote;
  let currentNote;
  let melodicIntervals = [];

  melody.measures.forEach((measure, measureIndex, measureArr) => {
    measure.notes.forEach((note, noteIndex, noteArr) => {
      if (measureIndex === 0 && noteIndex === 0) {
        currentNote = melody.measures[0].notes[0];
      } else {
        prevNote = currentNote;
        currentNote = noteArr[noteIndex];
        let distance = Interval.distance(prevNote.pitch, currentNote.pitch);
        melodicIntervals.push(distance);
      }
    });
  });

  let melodicIntervalNumbers = melodicIntervals.map((interval) =>
    Math.abs(Interval.get(interval).num)
  );

  let intervalCount = melodicIntervalNumbers.length;
  let leapsCount = melodicIntervalNumbers.reduce(
    (leaps, interval) => (interval > 2 ? leaps + 1 : leaps),
    0
  );

  console.log(leapsCount / intervalCount);
};

const errorFormat = {
  measureNumber: 1,
  noteIndex: 1,
  severity: 3, // something like 1 low, 2 med, 3 high?
  type: 'leap should resolve by step', // consecutive leaps, range is greater than octave
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
  usesMostlyStepwiseMotion(melody);
  // Check for leaps >= 4th to reverse by step
  // Check for consecutive leaps

  return;
};

melodicAnalysis(melody);
