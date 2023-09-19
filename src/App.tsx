import { useState } from 'react';
import { Voice } from './types';
import MelodicErrorList from './components/MelodicErrors';
import NotationInput from './components/NotationInput/NotationInput';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <Container>
      <NotationInput
        voice1={voice1}
        voice2={voice2}
        setVoice1={setVoice1}
        setVoice2={setVoice2}
      />

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">Melodic Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5">Upper Voice</Typography>
                <MelodicErrorList voice={voice1} />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5">Lower Voice</Typography>
                <MelodicErrorList voice={voice2} />
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default App;
