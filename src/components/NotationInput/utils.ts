export const mapKeyToAction = (
  key: string,
  setNoteLetter: React.Dispatch<React.SetStateAction<string>>,
  setNoteValue: React.Dispatch<React.SetStateAction<string>>,
  setOctave: React.Dispatch<React.SetStateAction<string>>,
  setCurrentVoice: React.Dispatch<React.SetStateAction<string>>,
  handleNewNote: () => void,
  handleDelete: () => void
) => {
  switch (key) {
    case 'c':
      setNoteLetter('C');
      break;
    case 'd':
      setNoteLetter('D');
      return;
    case 'e':
      setNoteLetter('E');
      return;
    case 'f':
      setNoteLetter('F');
      return;
    case 'g':
      setNoteLetter('G');
      return;
    case 'a':
      setNoteLetter('A');
      return;
    case 'b':
      setNoteLetter('B');
      return;
    case '7':
      setNoteValue('1');
      return;
    case '6':
      setNoteValue('1/2');
      return;
    case '5':
      setNoteValue('1/4');
      return;
    case '4':
      setNoteValue('1/8');
      return;
    case 'ArrowUp':
      setOctave((oct) => Math.min(Number(oct) + 1, 7).toString());
      return;
    case 'ArrowDown':
      setOctave((oct) => Math.max(Number(oct) - 1, 1).toString());
      return;
    case 'Enter':
      handleNewNote();
      return;
    case 'Backspace':
      handleDelete();
      return;
    case 'u':
      setCurrentVoice('1');
      return;
    case 'l':
      setCurrentVoice('2');
      return;
  }
};
