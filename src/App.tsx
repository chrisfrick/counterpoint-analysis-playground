import { useEffect, useState } from 'react';
import abcjs from 'abcjs';
import { AbcNotation, Interval } from 'tonal';

import { calculateMelodicIntervals, calculateMotion } from './utils';

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
  console.log(counterpointObject.motion());

  const abcString = `
M: 4/4
L: 1
%%staves [V1 V2]
V: V1 clef=treble
V: V2 clef=bass
[V: V1] ${upperVoice}|]
w: ${counterpointObject.intervals().join(' ')}
[V: V2] ${lowerVoice}|]
`;

  useEffect(() => {
    abcjs.renderAbc('paper', abcString);
    // console.log(counterpointObject)
  }, [abcString]);

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
      <div id="paper"></div>
      <div>upper voice: {counterpointObject.upperVoice.join(' // ')}</div>
      <div>lower voice: {counterpointObject.lowerVoice.join(' // ')}</div>
      <div>intervals: {counterpointObject.intervals().join('  //  ')}</div>
      <div>motion: {counterpointObject.motion().join('  //  ')}</div>
    </div>
  );
};

export default App;
