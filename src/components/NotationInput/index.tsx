import { useEffect, useState } from 'react';
import { Measure, Note, Voice } from '../../types';
import { Stack, Typography, Button } from '@mui/material';

import Notation from '../Notation';
import { singleVoiceToAbc } from '../../musicObjectToAbcNotation';
import { calculateMeasureLength, noteLengthToDecimal } from '../../utils';
import NoteValueButtons from './NoteValueButtons';
import NoteLetterButtons from './NoteLetterButtons';
import OctaveButtons from './OctaveButtons';

const NotationInput = () => {
  const [noteValue, setNoteValue] = useState('1');
  const [noteLetter, setNoteLetter] = useState('C');
  const [octave, setOctave] = useState('4');
  const [currentVoice, setCurrentVoice] = useState('1');
  const [voice2, setVoice2] = useState<Voice>({
    key: 'C',
    timeSignature: '4/4',
    clef: 'bass',
    cantus: false,
    measures: [
      {
        notes: [],
      },
    ],
  });
  const [voice1, setVoice1] = useState<Voice>({
    key: 'C',
    timeSignature: '4/4',
    clef: 'treble',
    cantus: false,
    measures: [
      {
        notes: [],
      },
    ],
  });
  const [abcString, setAbcString] = useState('');

  useEffect(() => {
    const noteString = singleVoiceToAbc(voice1);
    const newAbcString = `
    M: ${voice1.timeSignature}
    L: 1
    K: ${voice1.key}
    ${noteString}|]
    `;
    setAbcString(newAbcString);
  }, [voice1]);

  const handleNewNote = () => {
    const pitch = noteLetter.concat(octave);
    const newNote: Note = {
      pitch,
      duration: noteValue,
    };

    // Need to use JSON.parse() here so that deeper objects are cloned and note referenced!
    const measures = JSON.parse(JSON.stringify(voice1)).measures;
    const lastMeasure = measures[measures.length - 1];
    const lastMeasureLength = calculateMeasureLength(lastMeasure);

    // Check if last measure is full
    if (lastMeasureLength === 1) {
      const newMeasure = {
        notes: [newNote],
      };
      setVoice1({ ...voice1, measures: [...measures, newMeasure] });
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
    const updatedVoice = { ...voice1, measures: updatedMeasures };
    setVoice1(updatedVoice);
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

        <Button variant="outlined" onClick={handleNewNote}>
          Add Note
        </Button>
      </Stack>

      <Notation abcString={abcString} />
    </div>
  );
};

export default NotationInput;
