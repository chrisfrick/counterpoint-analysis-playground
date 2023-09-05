import { useState } from 'react';
import { AbcNotation, Interval } from 'tonal';

import { calculateMotion } from './utils';
import Notation from './components/Notation';

const App = () => {
  const [upperVoice, setUpperVoice] = useState('cdefdFG');
  const [lowerVoice, setLowerVoice] = useState('C,B,,A,,A,,B,,D,G,');

  const abcSplit = (abcNotation: string) => abcNotation.split(/(?=[A-Za-z])/);

  const counterpointObject = {
    lowerVoice: abcSplit(lowerVoice).map((note) =>
      AbcNotation.abcToScientificNotation(note)
    ),
    upperVoice: abcSplit(upperVoice).map((note) =>
      AbcNotation.abcToScientificNotation(note)
    ),
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

  const upperVoiceAbc = abcSplit(upperVoice);
  const motion = counterpointObject.motion();
  const upperVoiceRenderArr: string[] = [];
  upperVoiceAbc.forEach((note, index) => {
    if (motion[index]) {
      upperVoiceRenderArr.push(note);
      upperVoiceRenderArr.push(`"^${motion[index][0]}"y`);
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
    lowerVoiceRenderArr.push('y');
  });
  console.log(lowerVoiceRenderArr);

  const abcString = `
M: 4/4
L: 1
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
      <div>upper voice: {counterpointObject.upperVoice.join(' // ')}</div>
      <div>lower voice: {counterpointObject.lowerVoice.join(' // ')}</div>
      <div>intervals: {counterpointObject.intervals().join('  //  ')}</div>
      <div>motion: {counterpointObject.motion().join('  //  ')}</div>
    </div>
  );
};

export default App;
