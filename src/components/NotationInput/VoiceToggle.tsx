import { ToggleButton, ToggleButtonGroup } from '@mui/material';

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
      exclusive
      onChange={handleVoiceToggle}
    >
      <ToggleButton value="1">Upper Voice (u)</ToggleButton>
      <ToggleButton value="2">Lower Voice (l)</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default VoiceToggle;
