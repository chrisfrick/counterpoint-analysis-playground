import { useEffect, useRef } from 'react';
import { Vex } from 'vexflow';

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
      stave
        .addClef('treble')
        .addTimeSignature('4/4')
        .setContext(context)
        .draw();

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

  return <div id="music-notation" ref={containerRef}></div>;
};

export default MusicNotation;
