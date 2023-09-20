import {
  Button,
  Stack,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/joy';

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
      <ToggleButtonGroup value={noteLetter} onChange={handleNoteLetter}>
        {letters.map((letter) => (
          <Button value={letter} key={letter}>
            <Tooltip title={`(${letter.toLowerCase()})`}>
              <Typography>{letter}</Typography>
            </Tooltip>
          </Button>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default NoteLetterButtons;
