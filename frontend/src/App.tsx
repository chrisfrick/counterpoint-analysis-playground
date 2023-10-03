import { useState } from 'react';
import { Voice } from './types';

import emptyVoices from './data/emptyFirstSpeciesVoices';
import Logo from './components/Logo';
import ShowExample from './components/ShowExample';
import NotationInput from './components/NotationInput/NotationInput';
import ErrorCheckingSelection from './components/ErrorCheckingSelection';
import MelodicAnalysis from './components/MelodicAnalysis';
import HelpModal from './components/HelpModal';

import { Container, CssBaseline } from '@mui/joy';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import theme from './theme';

const materialTheme = materialExtendTheme();

const App = () => {
  const [voice2, setVoice2] = useState<Voice>(emptyVoices.lowerVoice);

  const [voice1, setVoice1] = useState<Voice>(emptyVoices.upperVoice);

  const [checkTritones, setCheckTritones] = useState(true);
  const [showMotion, setShowMotion] = useState(true);

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Logo />

          <ShowExample setVoice1={setVoice1} setVoice2={setVoice2} />

          <NotationInput
            voice1={voice1}
            voice2={voice2}
            setVoice1={setVoice1}
            setVoice2={setVoice2}
            checkTritones={checkTritones}
            showMotion={showMotion}
          />

          <ErrorCheckingSelection
            checkTritones={checkTritones}
            setCheckTritones={setCheckTritones}
            showMotion={showMotion}
            setShowMotion={setShowMotion}
          />

          <MelodicAnalysis voice1={voice1} voice2={voice2} />
          <HelpModal />
        </Container>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default App;
