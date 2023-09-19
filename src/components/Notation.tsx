import { useEffect, useRef } from 'react';
import abcjs from 'abcjs';
import './Notation.css';
import { Box, Sheet } from '@mui/joy';

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
    }
  }, [abcString]);

  const text = document.querySelectorAll('.abcjs-annotation');
  return (
    <Box sx={{ width: 1, mt: 1, mb: 1 }}>
      <Sheet variant="outlined" color="neutral" ref={notation}></Sheet>
    </Box>
  );
};

export default Notation;
