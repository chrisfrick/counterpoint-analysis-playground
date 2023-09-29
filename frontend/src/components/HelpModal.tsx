import { useState } from 'react';
import { Sheet, Typography } from '@mui/joy';
import { Backdrop, SpeedDial } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const HelpModal = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <>
      <Backdrop open={helpOpen}>
        <Sheet sx={{ p: 3 }} variant="outlined">
          <Typography level="h2">Keyboard shortcuts</Typography>
          <Typography>u/l: select upper/lower voice</Typography>
          <Typography>a-g: select note letter</Typography>
          <Typography>4-7: select note value</Typography>
          <Typography>up/down arrows: octave up/down</Typography>
          <Typography>return: add note</Typography>
          <Typography>backspace: delete note</Typography>
        </Sheet>
      </Backdrop>
      <SpeedDial
        ariaLabel="help"
        sx={{ position: 'absolute', bottom: 30, right: 30 }}
        icon={<QuestionMarkIcon />}
        onOpen={() => setHelpOpen(true)}
        onClose={() => setHelpOpen(false)}
      ></SpeedDial>
    </>
  );
};

export default HelpModal;
