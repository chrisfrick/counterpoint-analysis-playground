import { Button, ToggleButtonGroup } from '@mui/joy';

interface Props {
  currentVoice: string;
  setCurrentVoice: React.Dispatch<React.SetStateAction<string>>;
}

const VoiceToggle = ({ currentVoice, setCurrentVoice }: Props) => {
  const handleVoiceToggle = (
    event: React.MouseEvent<HTMLElement>,
    newCurrentVoice: string | null
  ) => {
    if (newCurrentVoice !== null) {
      setCurrentVoice(newCurrentVoice);
    }
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={currentVoice}
      onChange={handleVoiceToggle}
    >
      <Button value="1">Upper Voice (u)</Button>
      <Button value="2">Lower Voice (l)</Button>
    </ToggleButtonGroup>
  );
};

export default VoiceToggle;
