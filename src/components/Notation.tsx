import { useEffect, useRef } from 'react';
import abcjs from 'abcjs';
import './Notation.css';

interface NotationProps {
  abcString: string;
}

const Notation = ({ abcString }: NotationProps) => {
  const notation = useRef(null);

  const options = {
    add_classes: true,
    selectionColor: 'green',
    responsive: 'resize',
  };

  useEffect(() => {
    if (notation.current) {
      const abcObject = abcjs.renderAbc(notation.current, abcString, {
        add_classes: true,
        selectionColor: 'red',
        responsive: 'resize',
      });
      console.log(abcString.length);
      console.log(abcObject[0].getElementFromChar(100));
    }
  }, [abcString]);

  const text = document.querySelectorAll('.abcjs-annotation');
  console.log(text);
  return (
    <div style={{ width: 900 }}>
      <div ref={notation}></div>
    </div>
  );
};

export default Notation;
