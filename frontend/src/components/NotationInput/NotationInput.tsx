import { useEffect, useState } from 'react';
import { Note, Voice } from '../../types';
import {
  Button,
  Tooltip,
  Select,
  Option,
  Alert,
  Grid,
  ToggleButtonGroup,
} from '@mui/joy';
import { Snackbar } from '@mui/material';

import Notation from '../Notation';
import { firstSpeciesToAbc } from '../../musicObjectToAbcNotation';
import { calculateMeasureLength } from '../../utils';
import NoteValueButtons from './NoteValueButtons';
import NoteLetterButtons from './NoteLetterButtons';
import OctaveButtons from './OctaveButtons';
import VoiceToggle from './VoiceToggle';
import { mapKeyToAction } from './utils';

interface Props {
  voice1: Voice;
  voice2: Voice;
  setVoice1: React.Dispatch<React.SetStateAction<Voice>>;
  setVoice2: React.Dispatch<React.SetStateAction<Voice>>;
  checkTritones: boolean;
  showMotion: boolean;
}

const NotationInput = ({
  voice1,
  setVoice1,
  voice2,
  setVoice2,
  checkTritones,
  showMotion,
}: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [abcString, setAbcString] = useState('');
  const [noteValue, setNoteValue] = useState('1');
  const [noteLetter, setNoteLetter] = useState('C');
  const [octave, setOctave] = useState('4');
  const [currentVoice, setCurrentVoice] = useState('1');
  const [species, setSpecies] = useState('First Species');

  useEffect(() => {
    const music = {
      key: 'C',
      timeSignature: '4/4',
      voice1,
      voice2,
    };
    const newAbcString = firstSpeciesToAbc(music, checkTritones, showMotion);
    setAbcString(newAbcString);
  }, [voice1, voice2, checkTritones, showMotion]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleNewNote = () => {
    const pitch = noteLetter.concat(octave);
    const newNote: Note = {
      pitch,
      duration: noteValue,
    };

    let thisVoice;
    let setThisVoice;
    let otherVoice;

    if (Number(currentVoice) === 1) {
      thisVoice = voice1;
      setThisVoice = setVoice1;
      otherVoice = voice2;
    } else {
      thisVoice = voice2;
      setThisVoice = setVoice2;
      otherVoice = voice1;
    }

    // Need to use JSON.parse() here so that deeper objects are cloned and not referenced!
    const measures = JSON.parse(JSON.stringify(thisVoice)).measures;
    const lastMeasure = measures[measures.length - 1];
    const lastMeasureLength = calculateMeasureLength(lastMeasure);

    // For First Species: check if other voice has the same note value in this position
    const measureIndex =
      lastMeasureLength === 1
        ? thisVoice.measures.length
        : thisVoice.measures.length - 1;
    const noteIndex =
      lastMeasureLength === 1
        ? 0
        : thisVoice.measures[measureIndex].notes.length;

    if (
      otherVoice.measures[measureIndex]?.notes &&
      otherVoice.measures[measureIndex].notes.length > 0 && // Other voice has notes in this measure
      otherVoice.measures[measureIndex].notes[noteIndex].duration !==
        newNote.duration // The new note I'm trying to add is the same duration as that note in this position in the other voice
    ) {
      setSnackbarMessage('Note value does not match the other voice');
      setSnackbarOpen(true);
      return;
    }

    // Check if last measure is full
    if (lastMeasureLength === 1) {
      const newMeasure = {
        notes: [newNote],
      };
      setThisVoice({ ...thisVoice, measures: [...measures, newMeasure] });
      return;
    }

    lastMeasure.notes = [...lastMeasure.notes, newNote];

    // Check if the new note would overflow the measure
    if (calculateMeasureLength(lastMeasure) > 1) {
      setSnackbarMessage('Too many beats in this measure');
      setSnackbarOpen(true);
      return;
    }
    const updatedMeasures = [...measures];
    updatedMeasures[updatedMeasures.length - 1] = lastMeasure;
    const updatedVoice = { ...thisVoice, measures: updatedMeasures };
    setThisVoice(updatedVoice);
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

  const handleKeyDown = (event: KeyboardEvent) => {
    mapKeyToAction(
      event.key,
      setNoteLetter,
      setNoteValue,
      setOctave,
      setCurrentVoice,
      handleNewNote,
      handleDelete
    );
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [noteValue, noteLetter, octave, currentVoice, voice1, voice2]);

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert color="danger" variant="solid">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        spacing={3}
        justifyContent="flex-start"
        sx={{ flexGrow: 1 }}
      >
        <Grid>
          <NoteValueButtons noteValue={noteValue} setNoteValue={setNoteValue} />
        </Grid>

        <Grid>
          <NoteLetterButtons
            noteLetter={noteLetter}
            setNoteLetter={setNoteLetter}
          />
        </Grid>

        <Grid>
          <OctaveButtons octave={octave} setOctave={setOctave} />
        </Grid>
        <Grid>
          <ToggleButtonGroup>
            <Tooltip title="(enter)">
              <Button variant="solid" color="neutral" onClick={handleNewNote}>
                Add Note
              </Button>
            </Tooltip>

            <Tooltip title="(backspace)">
              <Button variant="soft" color="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        spacing={3}
        pt={1}
      >
        <Grid>
          <Select
            value={species}
            onChange={(event, newValue) =>
              setSpecies(newValue ? newValue : 'First Species')
            }
          >
            <Option value="First Species">First Species</Option>
          </Select>
        </Grid>
        <Grid>
          <VoiceToggle
            currentVoice={currentVoice}
            setCurrentVoice={setCurrentVoice}
          />
        </Grid>
      </Grid>

      <Notation abcString={abcString} />
    </div>
  );
};

export default NotationInput;
