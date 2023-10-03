import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  Typography,
} from '@mui/joy';
import MelodicErrorList from './MelodicErrorsList';
import { Voice } from '../../types';

interface Props {
  voice1: Voice;
  voice2: Voice;
}

const MelodicAnalysis = ({ voice1, voice2 }: Props) => {
  return (
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
  );
};

export default MelodicAnalysis;
