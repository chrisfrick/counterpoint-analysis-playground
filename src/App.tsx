import { useState } from 'react';
import { Voice } from './types';
import MelodicErrorList from './components/MelodicErrors';
import NotationInput from './components/NotationInput/NotationInput';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Container,
  Grid,
  Typography,
} from '@mui/joy';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

const materialTheme = materialExtendTheme();

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
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <Container>
          <NotationInput
            voice1={voice1}
            voice2={voice2}
            setVoice1={setVoice1}
            setVoice2={setVoice2}
          />

          <Accordion defaultExpanded={true}>
            <AccordionSummary>
              <Typography level="h3">Melodic Analysis</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography level="h4">Upper Voice</Typography>
                    <MelodicErrorList voice={voice1} />
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography level="h4">Lower Voice</Typography>
                    <MelodicErrorList voice={voice2} />
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default App;
