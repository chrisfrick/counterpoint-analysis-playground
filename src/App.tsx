import { useEffect, useState } from 'react';
import abcjs from 'abcjs';
import { AbcNotation, Interval, Note } from 'tonal';

import { calculateSingleVoiceMotion } from './utils';

const App = () => {
  const [upperVoice, setUpperVoice] = useState('cdef');
  const [lowerVoice, setLowerVoice] = useState('C,B,,A,,A,,');

  const abcSplit = (abcNotation: string) => abcNotation.split(/(?=[A-Za-z])/);
  const abcInterval = (lowerVoice: string, upperVoice: string) =>
    Interval.simplify(AbcNotation.distance(lowerVoice, upperVoice));

  const counterpointObject = {
    lowerVoice: abcSplit(lowerVoice),
    upperVoice: abcSplit(upperVoice),
    intervals() {
      let intervals = [];
      for (let i = 0; i < this.lowerVoice.length; i++) {
        intervals.push(abcInterval(this.lowerVoice[i], this.upperVoice[i]));
      }
      return intervals;
    },
    motion() {
      let motion: string[] = [];
      let voice1 = this.upperVoice;
      let voice2 = this.lowerVoice;
      let voice2Motion = calculateSingleVoiceMotion(voice2);
      let voice1Motion = calculateSingleVoiceMotion(voice1);
      console.log(voice2Motion, voice1Motion);
      voice2Motion.forEach((entry, index) => {
        if (entry === 0 || voice1Motion[index] === 0) {
          motion = [...motion, 'Oblique'];
          return;
        }
        if (entry === voice1Motion[index]) {
          motion = [...motion, 'Similar'];
          return;
        }
        if (entry !== voice1Motion[index]) {
          motion = [...motion, 'Contrary'];
          return;
        }
      });
      return motion;
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
