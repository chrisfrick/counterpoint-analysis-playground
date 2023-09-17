import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Props {
  octave: string;
  handleOctave: (
    event: React.MouseEvent<HTMLElement>,
    newNoteValue: string | null
  ) => void;
}
const OctaveButtons = ({ octave, handleOctave }: Props) => {
  return (
    <Stack direction="row">
      <ToggleButtonGroup value={octave} exclusive onChange={handleOctave}>
        <ToggleButton value="1">1</ToggleButton>
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
        <ToggleButton value="5">5</ToggleButton>
        <ToggleButton value="6">6</ToggleButton>
        <ToggleButton value="7">7</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default OctaveButtons;
