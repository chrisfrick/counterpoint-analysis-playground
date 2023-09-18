import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Error, MelodicErrors, Voice } from '../types';
import { melodicAnalysis } from '../melodic-analysis';

interface Props {
  voice: Voice;
}

const MelodicErrorList = ({ voice }: Props) => {
  const [errors, setErrors] = useState<MelodicErrors>();

  useEffect(() => {
    setErrors(melodicAnalysis(voice));
  }, [voice]);

  const icon = (severity: Error['severity']) =>
    severity === 0 ? (
      <CheckCircleIcon color="success" />
    ) : (
      <ErrorIcon color="error" />
    );

  return errors ? (
    <List dense={true}>
      <ListItem>
        <ListItemIcon>{icon(errors.cadenceFormula.severity)}</ListItemIcon>
        <ListItemText>
          <Typography>
            Cadence Formula
            {errors.cadenceFormula.severity !== 0
              ? ': ' + errors.cadenceFormula.message
              : ' used correctly'}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{icon(errors.rangeWithinAnOctave.severity)}</ListItemIcon>
        <Typography>
          Range
          {errors.rangeWithinAnOctave.severity !== 0
            ? ': ' + errors.rangeWithinAnOctave.message
            : ' stays within an octave'}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>{icon(errors.stepwiseMotion.severity)}</ListItemIcon>
        <Typography>
          Stepwise motion
          {errors.stepwiseMotion.severity !== 0
            ? ': ' + errors.stepwiseMotion.message
            : ' is mostly maintained'}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {icon(errors.leapsResolveAppropriately[0]?.severity)}
        </ListItemIcon>
        <Typography>
          Leaps
          {errors.leapsResolveAppropriately[0]?.severity === 0
            ? ' resolve correctly'
            : ':'}
        </Typography>
      </ListItem>
      {errors.leapsResolveAppropriately[0]?.severity !== 0 ? (
        <List component="div" dense={true} sx={{ pl: 3 }}>
          {errors.leapsResolveAppropriately.map((error) => (
            <ListItem key={(error.measureIndex, error.noteIndex)}>
              <ListItemIcon></ListItemIcon>
              <Typography>
                Measure {error.measureIndex ? error.measureIndex + 1 : null}
                {': '}
                {error.message}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : null}
    </List>
  ) : null;
};

export default MelodicErrorList;
