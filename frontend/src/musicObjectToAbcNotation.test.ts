import { firstSpeciesToAbc } from './musicObjectToAbcNotation';
import { music, musicWithTritoneError } from './testData';

describe('firstSpeciesToAbc', () => {
  test('returns appropriate string when checkTritones and showMotion are true', () => {
    expect(firstSpeciesToAbc(musicWithTritoneError, true, true)).toEqual(`
M: 4/4
L: 1
K: C
%%staves [v1, v2]
V: v1 clef="treble"
V: v2 clef="bass"
[V: v1] c1/2"_C"yB1/2"_C"y|G1/2"_P"yA1/2"_C"y|G1/2"_C"y"^tritone!"B1/2"_O"y|B1/2"_O"yB1/2"_C"y|c1"_ "y|]
w: P8 M6 m3 M3 P8 A4 P5 M6 P8
[V: v2] C,1/2yD,1/2y|E,1/2yF,1/2y|G,1/2yF,1/2y|E,1/2yD,1/2y|C,1y|]
`);
  });

  test('returns appropriate string when checkTritones=false, showMotion=true', () => {
    expect(firstSpeciesToAbc(music, false, true)).toEqual(`
M: 4/4
L: 1
K: C
%%staves [v1, v2]
V: v1 clef="treble"
V: v2 clef="bass"
[V: v1] c1/2"_C"yB1/2"_C"y|G1/2"_P"yA1/2"_C"y|G1/2"_C"yA1/2"_C"y|B1/2"_O"yB1/2"_C"y|c1"_ "y|]
w: P8 M6 m3 M3 P8 M3 P5 M6 P8
[V: v2] C,1/2yD,1/2y|E,1/2yF,1/2y|G,1/2yF,1/2y|E,1/2yD,1/2y|C,1y|]
`);
  });

  test('returns appropriate string when checkTritones=true, showMotion=false', () => {
    expect(firstSpeciesToAbc(musicWithTritoneError, true, false)).toEqual(`
M: 4/4
L: 1
K: C
%%staves [v1, v2]
V: v1 clef="treble"
V: v2 clef="bass"
[V: v1] c1/2yB1/2y|G1/2yA1/2y|G1/2y"^tritone!"B1/2y|B1/2yB1/2y|c1y|]
w: P8 M6 m3 M3 P8 A4 P5 M6 P8
[V: v2] C,1/2yD,1/2y|E,1/2yF,1/2y|G,1/2yF,1/2y|E,1/2yD,1/2y|C,1y|]
`);
  });

  test('returns appropriate string when checkTritones=false, showMotion=false', () => {
    expect(firstSpeciesToAbc(musicWithTritoneError, false, false)).toEqual(`
M: 4/4
L: 1
K: C
%%staves [v1, v2]
V: v1 clef="treble"
V: v2 clef="bass"
[V: v1] c1/2yB1/2y|G1/2yA1/2y|G1/2yB1/2y|B1/2yB1/2y|c1y|]
w: P8 M6 m3 M3 P8 A4 P5 M6 P8
[V: v2] C,1/2yD,1/2y|E,1/2yF,1/2y|G,1/2yF,1/2y|E,1/2yD,1/2y|C,1y|]
`);
  });
});
