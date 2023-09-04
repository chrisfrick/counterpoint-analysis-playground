import { useEffect, useRef } from 'react';
import { Vex } from 'vexflow';

const EasyScore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Create a VexFlow Renderer
      const vf = new Vex.Flow.Factory({
        renderer: {
          elementId: 'music-notation',
          width: 1100,
          height: 900,
        },
      });
      const score = vf.EasyScore();

      let x = 120;
      let y = 80;

      const appendSystem = (width: number) => {
        const system = vf.System({ x, y, width, spaceBetweenStaves: 10 });
        x += width;
        return system;
      };

      let system = appendSystem(220);

      score.set({ time: '4/4' });

      system
        .addStave({
          voices: [score.voice(score.notes('G4/w'))],
        })
        .addClef('treble')
        .addKeySignature('Eb');

      system
        .addStave({
          voices: [score.voice(score.notes('Eb3/w', { clef: 'bass' }))],
        })
        .addClef('bass')
        .addKeySignature('Eb');

      system.addConnector('brace');
      system.addConnector('singleRight');
      system.addConnector('singleLeft');

      /* Measure 2 */

      system = appendSystem(150);

      system.addStave({
        voices: [score.voice(score.notes('F4/w'))],
      });

      system.addStave({
        voices: [score.voice(score.notes('F3/w', { clef: 'bass' }))],
      });

      system.addConnector('singleRight');

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

export default EasyScore;
