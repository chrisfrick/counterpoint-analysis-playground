import { KeyboardArrowRight } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/joy';
import { Voice } from '../types';

const exampleLowerVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'bass',
  cantus: false,
  measures: [
    {
      notes: [
        {
          pitch: 'C3',
          duration: '1/2',
        },
        {
          pitch: 'D3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E3',
          duration: '1/2',
        },
        {
          pitch: 'F3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G3',
          duration: '1/2',
        },
        {
          pitch: 'F3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'E3',
          duration: '1/2',
        },
        {
          pitch: 'D3',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'C3',
          duration: '1',
        },
      ],
    },
  ],
};

const exampleUpperVoice: Voice = {
  key: 'C',
  timeSignature: '4/4',
  clef: 'treble',
  cantus: false,
  measures: [
    {
      notes: [
        {
          pitch: 'C5',
          duration: '1/2',
        },
        {
          pitch: 'B4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G4',
          duration: '1/2',
        },
        {
          pitch: 'A4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'G4',
          duration: '1/2',
        },
        {
          pitch: 'A4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'B4',
          duration: '1/2',
        },
        {
          pitch: 'B4',
          duration: '1/2',
        },
      ],
    },
    {
      notes: [
        {
          pitch: 'C5',
          duration: '1',
        },
      ],
    },
  ],
};

interface Props {
  setVoice1: React.Dispatch<React.SetStateAction<Voice>>;
  setVoice2: React.Dispatch<React.SetStateAction<Voice>>;
}

const ShowExample = ({ setVoice1, setVoice2 }: Props) => {
  const handleClick = () => {
    setVoice1(exampleUpperVoice);
    setVoice2(exampleLowerVoice);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid>
        <Typography level="title-lg">
          Not sure how a finished exercise should look?
        </Typography>{' '}
      </Grid>
      <Grid>
        <Button
          variant="soft"
          endDecorator={<KeyboardArrowRight />}
          onClick={handleClick}
        >
          Show example
        </Button>
      </Grid>
    </Grid>
  );
};

export default ShowExample;
