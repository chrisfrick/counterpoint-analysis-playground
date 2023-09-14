export const musicObjectToAbcNotation = (musicObject: any) => {
  console.log(musicObject);
  const voice1 = musicObject.voice1;
  const voice2 = musicObject.voice2;

  const cantus = musicObject.voice2.cantus ? voice2 : voice1;
  console.log(cantus.measures);

  const abcNotation = `
T: Title
C: Composer
M: ${voice1.timeSignature}
L: 1
%%staves [v1, v2]
V: v1 clef="${voice1.clef}"
V: v2 clef="${voice2.clef}"
V: v1
c"_C"y|B"_O"y|"^tritone!"B"_O"y|c"_C"y|B"_O"y|B"_P"y|c"_P"y|B"_C"y|c|]
w: 1P 6M 4A 5P 3M 6M 6m 6M 1P
V: v2
C,y|D,y|F,y|F,y|G,y|D,y|E,y|D,y|C,|]

`;
  return abcNotation;
};
