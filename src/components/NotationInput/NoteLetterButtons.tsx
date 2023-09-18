import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';

interface Props {
  noteLetter: string;
  setNoteLetter: React.Dispatch<React.SetStateAction<string>>;
}

const NoteLetterButtons = ({ noteLetter, setNoteLetter }: Props) => {
  const handleNoteLetter = (
    event: React.MouseEvent<HTMLElement>,
    newNoteLetter: string | null
  ) => {
    if (newNoteLetter !== null) {
      setNoteLetter(newNoteLetter);
    }
  };

  const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return (
    <Stack direction="row">
      <ToggleButtonGroup
        value={noteLetter}
        exclusive
        onChange={handleNoteLetter}
      >
        {letters.map((letter) => (
          <ToggleButton value={letter} key={letter}>
            <Tooltip title={`(${letter.toLowerCase()})`}>
              <Typography>{letter}</Typography>
            </Tooltip>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default NoteLetterButtons;
