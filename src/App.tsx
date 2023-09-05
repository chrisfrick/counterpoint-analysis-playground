import { useEffect, useState } from 'react';
import { AbcNotation, Interval } from 'tonal';

import {
  abcSplit,
  calculateMotion,
  isTritone,
  usesCadenceFormula,
} from './utils';
import Notation from './components/Notation';

const App = () => {
  const [upperVoice, setUpperVoice] = useState('cBBcBBcBc');
  const [lowerVoice, setLowerVoice] = useState('C,D,F,F,G,D,E,D,C,');
  const [keySignature, setKeySignature] = useState('C');
  const [errors, setErrors] = useState({});

  const counterpointObject = {
    lowerVoice: abcSplit(lowerVoice).map((note) =>
      AbcNotation.abcToScientificNotation(note)
    ),
    upperVoice: abcSplit(upperVoice).map((note) =>
      AbcNotation.abcToScientificNotation(note)
    ),
    key: keySignature,
    intervals() {
      const intervals = [];
      for (let i = 0; i < this.lowerVoice.length; i++) {
        intervals.push(
          Interval.simplify(
            Interval.distance(this.lowerVoice[i], this.upperVoice[i])
          )
        );
      }
      return intervals;
    },
    motion() {
      const voice1 = this.upperVoice;
      const voice2 = this.lowerVoice;
      return calculateMotion(voice1, voice2);
    },
  };

  const motion = counterpointObject.motion();

  interface error {
    type: string;
    noteIndex: number;
  }
  // check for tritones
  const checkForTritones = (intervals: string[]) => {
    const tritoneErrors: error[] = [];
    intervals.forEach((interval, index) => {
      if (isTritone(interval)) {
        const newError = { type: 'tritone', noteIndex: index };
        tritoneErrors.push(newError);
      }
    });
    return tritoneErrors;
  };

  const tritoneErrors = checkForTritones(counterpointObject.intervals());
  console.log(tritoneErrors);

  const upperVoiceAbc = abcSplit(upperVoice);
  const upperVoiceRenderArr: string[] = [];
  upperVoiceAbc.forEach((note, index) => {
    if (motion[index]) {
      upperVoiceRenderArr.push(note);
      upperVoiceRenderArr.push(`"_${motion[index][0]}"y|`);
      return;
    }
    upperVoiceRenderArr.push(note);
  });

  const lowerVoiceAbc = abcSplit(lowerVoice);
  const lowerVoiceRenderArr: string[] = [];
  lowerVoiceAbc.forEach((note, index) => {
    if (index === lowerVoiceAbc.length - 1) {
      lowerVoiceRenderArr.push(note);
      return;
    }
    lowerVoiceRenderArr.push(note);
    lowerVoiceRenderArr.push('y|');
  });

  const abcString = `
M: 4/4
L: 1
K: ${keySignature}
%%staves [V1 V2]
V: V1 clef=treble
V: V2 clef=bass
[V: V1] ${upperVoiceRenderArr.join('')}|]
w: ${counterpointObject.intervals().join(' ')}
[V: V2] ${lowerVoiceRenderArr.join('')}|]
`;

  const motionTest = `
M: 4/4
L: 1
%%staves [V1 V2]
V: V1 clef=treble
V: V2 clef=bass
[V: V1] cydyeyfydyFyG|]
w: 1 3 5 6 3 3 8
[V: V2] C,yB,,yA,,yA,,yB,,yD,yG,|]
`;

  return (
    <div>
      <div>
        key
        <select
          value={keySignature}
          onChange={(event) => setKeySignature(event.target.value)}
        >
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div>
        upper voice
        <input
          value={upperVoice}
          onChange={(event) => setUpperVoice(event.target.value)}
        />
      </div>
      <div>
        lower voice
        <input
          value={lowerVoice}
          onChange={(event) => setLowerVoice(event.target.value)}
        />
      </div>
      <Notation abcString={abcString} />
      <div>upper voice: {counterpointObject.upperVoice.join(', ')}</div>
      <div>
        upper voice uses cadence formula:{' '}
        {usesCadenceFormula(
          counterpointObject.upperVoice,
          keySignature
        ).toString()}
      </div>
      <br></br>
      <div>lower voice: {counterpointObject.lowerVoice.join(', ')}</div>
      <div>
        lower voice uses cadence formula:{' '}
        {usesCadenceFormula(
          counterpointObject.lowerVoice,
          keySignature
        ).toString()}
      </div>
      <br></br>
      <div>intervals: {counterpointObject.intervals().join(', ')}</div>
      <div>motion: {counterpointObject.motion().join(', ')}</div>
      <br></br>
      <div>
        Errors
        <ul>
          {tritoneErrors.map((error) => (
            <li key={error.noteIndex}>
              measure: {error.noteIndex} type: {error.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
