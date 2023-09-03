import { useEffect, useRef, useState } from 'react';
import abcjs from 'abcjs'
import { AbcNotation, Interval } from 'tonal'

import Vex from 'vexflow';

/* 
const MusicNotation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const VF = Vex.Flow;
    const container = containerRef.current;

    if (container) {
      // Create a VexFlow Renderer
      const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
      renderer.resize(400, 200); // Set the dimensions of the notation area

      // Create a VexFlow context
      const context = renderer.getContext();

      // Create a stave
      const stave = new VF.Stave(10, 40, 300); // x, y, width
      stave.addClef('treble').addTimeSignature('4/4').setContext(context).draw();


      // Create notes
      const notes = [
        new VF.StaveNote({ keys: ['c/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['d/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['e/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['f/4'], duration: 'q' }),
      ];

      const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(notes);

      new VF.Formatter().joinVoices([voice]).format([voice], 250);
      voice.draw(context, stave);
    }
  }, []);

  return (
    <div id="music-notation" ref={containerRef}>
      
    </div>
  );
};
*/

const EasyScore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Create a VexFlow Renderer
      const vf = new Vex.Flow.Factory({renderer: {
        elementId: 'music-notation',
        width: 1100,
        height: 900,
      }});
      const score = vf.EasyScore();

      let x = 120;
      let y = 80;

      const appendSystem = (width: number) => {
        const system = vf.System({ x, y, width, spaceBetweenStaves: 10 });
        x += width;
        return system;
      }

      let system = appendSystem(220)

      score.set({ time: '4/4' });

      system
        .addStave({
          voices: [
            score.voice(score.notes('G4/w')),
          ],
        })
        .addClef('treble')
        .addKeySignature('Eb');

      system
        .addStave({
          voices: [
            score.voice(score.notes('Eb3/w', { clef: 'bass' })),
          ]
        })
        .addClef('bass')
        .addKeySignature('Eb');

      system.addConnector('brace');
      system.addConnector('singleRight');
      system.addConnector('singleLeft');

      /* Measure 2 */

      system = appendSystem(150)

      system.addStave({
        voices: [
          score.voice(score.notes('F4/w')),
        ]
      })

      system.addStave({
        voices: [
          score.voice(score.notes('F3/w', { clef: 'bass' })),
        ]
      })

      system.addConnector('singleRight')

      vf.draw();

      /*
      // Create notes
      const notes = [
        new VF.StaveNote({ keys: ['c/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['d/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['e/4'], duration: 'q' }),
        new VF.StaveNote({ keys: ['f/4'], duration: 'q' }),
      ];

      const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(notes);

      new VF.Formatter().joinVoices([voice]).format([voice], 250);
      voice.draw(context, stave);
      */
    }
  }, []);

  return (
    <div id="music-notation" ref={containerRef}>
      {/* The notation will be rendered here */}
    </div>
  );
};

const App = () => {
  const [upperVoice, setUpperVoice] = useState('cde')
  const [lowerVoice, setLowerVoice] = useState('CDE')

  const abcSplit = (abcNotation: string) => abcNotation.split(/(?=[A-Za-z])/)
  const abcInterval = (lowerVoice: string, upperVoice: string) =>
    Interval.simplify(AbcNotation.distance(lowerVoice, upperVoice))

  const counterpointObject = {
    lowerVoice: abcSplit(lowerVoice),
    upperVoice: abcSplit(upperVoice),
    intervals() {
      let intervals = []
      for (let i = 0; i < this.lowerVoice.length; i++) {
        intervals.push(abcInterval(this.lowerVoice[i], this.upperVoice[i]))
      }
      return intervals
    },
  }

  const intervals = () => {
    let ints = []
    for (let i = 0; i < lowerVoice.length; i++) {
      ints.push(abcInterval(lowerVoice[i], upperVoice[i]))
    }
    return ints
  }

  const abcString = `
M: 4/4
L: 1
%%staves [V1 V2]
V: V1 clef=treble
V: V2 clef=bass
[V: V1] ${upperVoice}]
w: ${counterpointObject.intervals().join(' ')}
[V: V2] ${lowerVoice}]

`

  useEffect(() => {
    abcjs.renderAbc('paper', abcString)
  }, [abcString])

  return (
    <div>
      <div>
        upper voice
        <input
          value={upperVoice}
          onChange={event => setUpperVoice(event.target.value)}
        />
      </div>
      <div>
        lower voice
        <input
          value={lowerVoice}
          onChange={event => setLowerVoice(event.target.value)}
        />
      </div>
      <div id="paper"></div>
      <div>{Interval.simplify(AbcNotation.distance('E', 'g'))}</div>
      <div>upper voice: {counterpointObject.upperVoice.join(' // ')}</div>
      <div>lower voice: {counterpointObject.lowerVoice.join(' // ')}</div>
      <div>intervals: {counterpointObject.intervals().join('  //  ')}</div>
    </div>
  )
}

export default App

