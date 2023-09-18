import { useEffect, useState } from 'react';
import { Note, Voice } from '../../types';
import { Stack, Typography, Button } from '@mui/material';

import Notation from '../Notation';
import { musicObjectToAbcNotation } from '../../musicObjectToAbcNotation';
import {
  calculateMeasureLength,
  extractNotesFromSingleVoice,
} from '../../utils';
import NoteValueButtons from './NoteValueButtons';
import NoteLetterButtons from './NoteLetterButtons';
import OctaveButtons from './OctaveButtons';
import VoiceToggle from './VoiceToggle';

interface Props {
  voice1: Voice;
  voice2: Voice;
  setVoice1: React.Dispatch<React.SetStateAction<Voice>>;
  setVoice2: React.Dispatch<React.SetStateAction<Voice>>;
}

const NotationInput = ({ voice1, setVoice1, voice2, setVoice2 }: Props) => {
  const [abcString, setAbcString] = useState('');
  const [noteValue, setNoteValue] = useState('1');
  const [noteLetter, setNoteLetter] = useState('C');
  const [octave, setOctave] = useState('4');
  const [currentVoice, setCurrentVoice] = useState('1');

  useEffect(() => {
    const music = {
      key: 'C',
      timeSignature: '4/4',
      voice1,
      voice2,
    };
    const newAbcString = musicObjectToAbcNotation(music);
    setAbcString(newAbcString);
  }, [voice1, voice2]);

  const handleNewNote = () => {
    const pitch = noteLetter.concat(octave);
    const newNote: Note = {
      pitch,
      duration: noteValue,
    };

    const voice = Number(currentVoice) === 1 ? voice1 : voice2;
    const setVoice = Number(currentVoice) === 1 ? setVoice1 : setVoice2;

    // Need to use JSON.parse() here so that deeper objects are cloned and note referenced!
    const measures = JSON.parse(JSON.stringify(voice)).measures;
    const lastMeasure = measures[measures.length - 1];
    const lastMeasureLength = calculateMeasureLength(lastMeasure);

    // Check if last measure is full
    if (lastMeasureLength === 1) {
      const newMeasure = {
        notes: [newNote],
      };
      setVoice({ ...voice, measures: [...measures, newMeasure] });
      return;
    }

    lastMeasure.notes = [...lastMeasure.notes, newNote];

    // Check if the new note would overflow the measure
    if (calculateMeasureLength(lastMeasure) > 1) {
      alert('Too many beats in this measure');
      return;
    }
    const updatedMeasures = [...measures];
    updatedMeasures[updatedMeasures.length - 1] = lastMeasure;
    const updatedVoice = { ...voice, measures: updatedMeasures };
    setVoice(updatedVoice);
  };

  const handleDelete = () => {
    const voice = Number(currentVoice) === 1 ? voice1 : voice2;
    const setVoice = Number(currentVoice) === 1 ? setVoice1 : setVoice2;

    // Need to use JSON.parse() here so that deeper objects are cloned and note referenced!
    const updatedMeasures = JSON.parse(JSON.stringify(voice)).measures;
    const lastMeasure = updatedMeasures[updatedMeasures.length - 1];
    lastMeasure.notes.pop();
    if (
      calculateMeasureLength(lastMeasure) === 0 &&
      updatedMeasures.length > 1
    ) {
      updatedMeasures.pop();
    }
    const updatedVoice = { ...voice, measures: updatedMeasures };
    setVoice(updatedVoice);
  };

  return (
    <div>
      <Typography variant="h5">Notation Input</Typography>

      <Stack direction="row" spacing={3}>
        <NoteValueButtons noteValue={noteValue} setNoteValue={setNoteValue} />

        <NoteLetterButtons
          noteLetter={noteLetter}
          setNoteLetter={setNoteLetter}
        />

        <OctaveButtons octave={octave} setOctave={setOctave} />

        <Button variant="contained" onClick={handleNewNote}>
          Add Note
        </Button>

        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>

      <Stack direction="row" alignItems="baseline">
        <VoiceToggle
          currentVoice={currentVoice}
          setCurrentVoice={setCurrentVoice}
        />
        <Notation abcString={abcString} />
      </Stack>
    </div>
  );
};

export default NotationInput;
