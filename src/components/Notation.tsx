import { useEffect, useRef } from 'react';
import abcjs from 'abcjs';

interface NotationProps {
  abcString: string;
}

const Notation = ({ abcString }: NotationProps) => {
  const notation = useRef(null);

  const options = {
    add_classes: true,
    selectionColor: 'green',
  };

  useEffect(() => {
    if (notation.current) {
      abcjs.renderAbc(notation.current, abcString, options);
    }
  }, [abcString]);

  return (
    <div>
      <div ref={notation}></div>
    </div>
  );
};

export default Notation;
