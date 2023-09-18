import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Props {
  octave: string;
  setOctave: React.Dispatch<React.SetStateAction<string>>;
}
const OctaveButtons = ({ octave, setOctave }: Props) => {
  const handleOctave = (
    event: React.MouseEvent<HTMLElement>,
    newOctave: string | null
  ) => {
    if (newOctave !== null) {
      setOctave(newOctave);
    }
  };

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
