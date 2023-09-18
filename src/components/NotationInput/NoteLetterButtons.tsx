import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

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

  return (
    <Stack direction="row">
      <ToggleButtonGroup
        value={noteLetter}
        exclusive
        onChange={handleNoteLetter}
      >
        <ToggleButton value="C">C</ToggleButton>
        <ToggleButton value="D">D</ToggleButton>
        <ToggleButton value="E">E</ToggleButton>
        <ToggleButton value="F">F</ToggleButton>
        <ToggleButton value="G">G</ToggleButton>
        <ToggleButton value="A">A</ToggleButton>
        <ToggleButton value="B">B</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default NoteLetterButtons;
