import { useEffect, useState } from 'react';
import { Note } from '../types';
import {
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Icon } from '@mdi/react';
import {
  mdiMusicNoteEighth,
  mdiMusicNoteHalf,
  mdiMusicNoteQuarter,
  mdiMusicNoteWhole,
} from '@mdi/js';
import Notation from './Notation';
import { AbcNotation } from 'tonal';

const NotationInput = () => {
  const [noteValue, setNoteValue] = useState('1');
  const [noteLetter, setNoteLetter] = useState('C');
  const [octave, setOctave] = useState('4');
  const [voice1, setVoice1] = useState<Note[]>([]);
  const [abcString, setAbcString] = useState('');

  useEffect(() => {
    const string = voice1.map((note) =>
      AbcNotation.scientificToAbcNotation(note.pitch).concat(note.duration, ' ')
    );
    setAbcString(string.toString());
    console.log(abcString);
  }, [voice1]);

  const handleNoteLength = (
    event: React.MouseEvent<HTMLElement>,
    newNoteValue: string | null
  ) => {
    if (newNoteValue !== null) {
      setNoteValue(newNoteValue);
    }
  };

  const handleNoteLetter = (
    event: React.MouseEvent<HTMLElement>,
    newNoteLetter: string | null
  ) => {
    if (newNoteLetter !== null) {
      setNoteLetter(newNoteLetter);
    }
  };

  const handleOctave = (
    event: React.MouseEvent<HTMLElement>,
    newOctave: string | null
  ) => {
    if (newOctave !== null) {
      setOctave(newOctave);
    }
  };

  const handleNewNote = () => {
    const pitch = noteLetter.concat(octave);
    const newNote: Note = {
      pitch,
      duration: noteValue,
    };
    setVoice1([...voice1, newNote]);
    console.log(voice1);
  };

  return (
    <div>
      <h3>Notation Input</h3>
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
      <Typography>Octave</Typography>
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
      <button onClick={handleNewNote}>Add Note</button>
      <Notation abcString={abcString} />
    </div>
  );
};

export default NotationInput;
