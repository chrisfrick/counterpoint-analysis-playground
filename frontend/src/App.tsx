import { useState } from 'react';
import { Voice } from './types';
import MelodicErrorList from './components/MelodicErrors';
import NotationInput from './components/NotationInput/NotationInput';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Checkbox,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  Sheet,
  Typography,
} from '@mui/joy';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import theme from './theme';
import { AppBar } from '@mui/material';

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

  const [checkTritones, setCheckTritones] = useState(true);
  const [showMotion, setShowMotion] = useState(true);

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography
            level="h1"
            py={2}
            sx={{
              background: 'linear-gradient(to right bottom, #5bb9f0, #021017)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Harmony Helper
          </Typography>

          <NotationInput
            voice1={voice1}
            voice2={voice2}
            setVoice1={setVoice1}
            setVoice2={setVoice2}
            checkTritones={checkTritones}
            showMotion={showMotion}
          />

          <List
            variant="outlined"
            orientation="horizontal"
            sx={{ '--List-padding': '8px', '--List-radius': '8px' }}
          >
            <ListItem>
              <Checkbox
                checked={checkTritones}
                label="Check for tritones"
                size="lg"
                onChange={(event) => setCheckTritones(event.target.checked)}
              />
            </ListItem>
            <ListItem>
              <Checkbox
                checked={showMotion}
                label="Show motion"
                size="lg"
                onChange={(event) => setShowMotion(event.target.checked)}
              />
            </ListItem>
          </List>

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
