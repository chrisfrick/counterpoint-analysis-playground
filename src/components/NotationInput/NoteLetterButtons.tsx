import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Props {
  noteLetter: string;
  handleNoteLetter: (
    event: React.MouseEvent<HTMLElement>,
    newNoteLetter: string | null
  ) => void;
}

const NoteLetterButtons = ({ noteLetter, handleNoteLetter }: Props) => {
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
