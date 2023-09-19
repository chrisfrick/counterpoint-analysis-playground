import { Stack, Button, ToggleButtonGroup } from '@mui/joy';

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
      <ToggleButtonGroup value={octave} onChange={handleOctave}>
        <Button value="1">1</Button>
        <Button value="2">2</Button>
        <Button value="3">3</Button>
        <Button value="4">4</Button>
        <Button value="5">5</Button>
        <Button value="6">6</Button>
        <Button value="7">7</Button>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default OctaveButtons;
