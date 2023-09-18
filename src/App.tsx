import { useState } from 'react';
import { Voice } from './types';
import MelodicErrorList from './components/MelodicErrors';
import NotationInput from './components/NotationInput/NotationInput';
import { Divider, Stack, Typography } from '@mui/material';

const App = () => {
  const [voice2, setVoice2] = useState<Voice>({
    key: 'C',
    timeSignature: '4/4',
    clef: 'bass',
    cantus: false,
    measures: [
      {
        notes: [],
      },
    ],
  });

  const [voice1, setVoice1] = useState<Voice>({
    key: 'C',
    timeSignature: '4/4',
    clef: 'treble',
    cantus: false,
    measures: [
      {
        notes: [],
      },
    ],
  });

  return (
    <div>
      <NotationInput
        voice1={voice1}
        voice2={voice2}
        setVoice1={setVoice1}
        setVoice2={setVoice2}
      />
      <Typography variant="h4">Melodic Analysis</Typography>

      <Stack
        direction="row"
        spacing={5}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <div>
          <Typography variant="h5">Upper Voice</Typography>
          <MelodicErrorList voice={voice1} />
        </div>
        <div>
          <Typography variant="h5">Lower Voice</Typography>
          <MelodicErrorList voice={voice2} />
        </div>
      </Stack>
    </div>
  );
};

export default App;
