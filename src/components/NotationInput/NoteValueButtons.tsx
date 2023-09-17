import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Icon } from '@mdi/react';
import {
  mdiMusicNoteEighth,
  mdiMusicNoteHalf,
  mdiMusicNoteQuarter,
  mdiMusicNoteWhole,
} from '@mdi/js';

interface Props {
  noteValue: string;
  handleNoteLength: (
    event: React.MouseEvent<HTMLElement>,
    newNoteValue: string | null
  ) => void;
}

const NoteValueButtons = ({ noteValue, handleNoteLength }: Props) => {
  return (
    <Stack direction="row">
      <ToggleButtonGroup
        value={noteValue}
        exclusive
        onChange={handleNoteLength}
      >
        <ToggleButton value="1">
          <Icon path={mdiMusicNoteWhole} size={1}></Icon>
        </ToggleButton>
        <ToggleButton value="1/2">
          <Icon path={mdiMusicNoteHalf} size={1}></Icon>
        </ToggleButton>
        <ToggleButton value="1/4">
          <Icon path={mdiMusicNoteQuarter} size={1}></Icon>
        </ToggleButton>
        <ToggleButton value="1/8">
          <Icon path={mdiMusicNoteEighth} size={1}></Icon>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default NoteValueButtons;
