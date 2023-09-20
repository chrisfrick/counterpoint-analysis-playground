import { Stack, Button, ToggleButtonGroup, Tooltip } from '@mui/joy';
import { Icon } from '@mdi/react';
import {
  mdiMusicNoteEighth,
  mdiMusicNoteHalf,
  mdiMusicNoteQuarter,
  mdiMusicNoteWhole,
} from '@mdi/js';

interface Props {
  noteValue: string;
  setNoteValue: React.Dispatch<React.SetStateAction<string>>;
}

const NoteValueButtons = ({ noteValue, setNoteValue }: Props) => {
  const handleNoteLength = (
    event: React.MouseEvent<HTMLElement>,
    newNoteValue: string | null
  ) => {
    if (newNoteValue !== null) {
      setNoteValue(newNoteValue);
    }
  };

  return (
    <Stack direction="row">
      <ToggleButtonGroup value={noteValue} onChange={handleNoteLength}>
        <Button value="1/8">
          <Tooltip title="Eighth note (4)">
            <Icon path={mdiMusicNoteEighth} size={1}></Icon>
          </Tooltip>
        </Button>

        <Button value="1/4">
          <Tooltip title="Quarter note (5)">
            <Icon path={mdiMusicNoteQuarter} size={1}></Icon>
          </Tooltip>
        </Button>

        <Button value="1/2">
          <Tooltip title="Half note (6)">
            <Icon path={mdiMusicNoteHalf} size={1}></Icon>
          </Tooltip>
        </Button>

        <Button value="1">
          <Tooltip title="Whole note (7)">
            <Icon path={mdiMusicNoteWhole} size={1}></Icon>
          </Tooltip>
        </Button>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default NoteValueButtons;
