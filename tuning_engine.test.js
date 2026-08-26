const path = require('path');
const defs = require('./scripts/tuning_definitions.js');
// Put defs on global scope so engine can access them seamlessly
Object.assign(global, defs);

const { TuningEngine, instrument } = require('./scripts/tuning_engine.js');
const { HARMONICA_TUNINGS, GUITAR_TUNINGS, UKULELE_TUNINGS, menu } = defs;

let failures = 0;
function assert(cond, msg) {
    if (!cond) {
        console.error('FAIL: ' + msg);
        failures++;
    } else {
        console.log('PASS: ' + msg);
    }
}

console.log('--- TEST 1: Note Parsing & MIDI ---');
assert(TuningEngine.noteToMidi('C4') === 60, 'C4 is MIDI 60');
assert(TuningEngine.noteToMidi('A4') === 69, 'A4 is MIDI 69');
assert(TuningEngine.noteToMidi('C4s') === 61, 'C4s is MIDI 61');
assert(TuningEngine.noteToMidi('Db4') === 61, 'Db4 is MIDI 61');
assert(TuningEngine.midiToNoteId(60) === 'C4', '60 -> C4');
assert(TuningEngine.midiToNoteId(61) === 'C4s', '61 -> C4s');
assert(TuningEngine.midiToFrequency(69) === 440, 'A4 -> 440 Hz');
assert(TuningEngine.midiToFrequency(60) === 261.63, 'C4 -> 261.63 Hz');

console.log('\n--- TEST 2: Standard Richter in C (Unvalved) ---');
const unvalvedMatrix = TuningEngine.computeHarmonicaMatrix(
    HARMONICA_TUNINGS.diatonicrichter.blow.map(TuningEngine.noteToMidi),
    HARMONICA_TUNINGS.diatonicrichter.draw.map(TuningEngine.noteToMidi),
    false
);

// Check Hole 1 (index 0): Blow C4 (60), Draw D4 (62)
assert(unvalvedMatrix[2][0].name === 'C4' && unvalvedMatrix[2][0].type === 'blow', 'H1 Blow is C4');
assert(unvalvedMatrix[3][0].name === 'D4' && unvalvedMatrix[3][0].type === 'draw', 'H1 Draw is D4');
assert(unvalvedMatrix[4][0].name === 'C4s' && unvalvedMatrix[4][0].type === 'draw-bend', 'H1 Draw bend is C4s');
assert(unvalvedMatrix[1][0].name === 'D4s' && unvalvedMatrix[1][0].type === 'overblow' && unvalvedMatrix[1][0].label === 'OB', 'H1 Overblow is D4s (Eb4)');

// Check Hole 3 (index 2): Blow G4 (67), Draw B4 (71)
assert(unvalvedMatrix[2][2].name === 'G4', 'H3 Blow is G4');
assert(unvalvedMatrix[3][2].name === 'B4', 'H3 Draw is B4');
assert(unvalvedMatrix[4][2].name === 'A4s' && unvalvedMatrix[4][2].label === 'DB', 'H3 Draw bend 1 is A4s (Bb4)');
assert(unvalvedMatrix[5][2].name === 'A4' && unvalvedMatrix[5][2].label === 'DB', 'H3 Draw bend 2 is A4');
assert(unvalvedMatrix[6][2].name === 'G4s' && unvalvedMatrix[6][2].label === 'DB', 'H3 Draw bend 3 is G4s (Ab4)');
assert(unvalvedMatrix[1][2].name === 'C5' && unvalvedMatrix[1][2].type === 'overblow', 'H3 Overblow is C5');

console.log('\n--- TEST 3: Diatonic Minor Keys ---');
const wildeAmHtml = TuningEngine.generateHarmonicaHtml('diatonicwildeminor', 'am', false);
assert(wildeAmHtml.includes('name="D4"') && wildeAmHtml.includes('name="E4"'), 'Wilde Minor Am has Blow 1 = D4, Draw 1 = E4');
const wildeGmHtml = TuningEngine.generateHarmonicaHtml('diatonicwildeminor', 'gm', false);
assert(wildeGmHtml.includes('name="C4"') && wildeGmHtml.includes('name="D4"'), 'Wilde Minor Gm has Blow 1 = C4, Draw 1 = D4');
const wildeCmHtml = TuningEngine.generateHarmonicaHtml('diatonicwildeminor', 'cm', false);
assert(wildeCmHtml.includes('name="F4"') && wildeCmHtml.includes('name="G4"'), 'Wilde Minor Cm has Blow 1 = F4, Draw 1 = G4');

console.log('\n--- TEST 4: Chromatic 12 Tunings in All Keys ---');
// Solo
const chromSoloC = TuningEngine.generateChromaticHtml('chromatic12solo', 'c');
assert(chromSoloC.includes('name="C4"') && chromSoloC.includes('name="C4s"'), 'Chromatic 12 Solo (C) has C4 and C4s');
const chromSoloG = TuningEngine.generateChromaticHtml('chromatic12solo', 'g');
assert(chromSoloG.includes('name="G3"') && chromSoloG.includes('name="G3s"'), 'Chromatic 12 Solo (G) has G3 and G3s');
const chromSoloLowC = TuningEngine.generateChromaticHtml('chromatic12solo', 'lowc');
assert(chromSoloLowC.includes('name="C3"') && chromSoloLowC.includes('name="C3s"'), 'Chromatic 12 Solo (Tenor/Low C) has C3 and C3s');

// Bebop
const chromBebopC = TuningEngine.generateChromaticHtml('chromatic12bebop', 'c');
assert(chromBebopC.includes('name="A4s"'), 'Chromatic 12 Bebop (C) contains Bb4 (A4s)');
const chromBebopG = TuningEngine.generateChromaticHtml('chromatic12bebop', 'g');
assert(chromBebopG.includes('name="F4"'), 'Chromatic 12 Bebop (G) contains F4');

// C6
const chromC6C = TuningEngine.generateChromaticHtml('chromatic12c6', 'c');
assert(chromC6C.includes('name="A4"') && chromC6C.includes('name="G4s"'), 'Chromatic 12 C6 (C) contains A4 blow and G#4 draw');
const chromC6G = TuningEngine.generateChromaticHtml('chromatic12c6', 'g');
assert(chromC6G.includes('name="E4"') && chromC6G.includes('name="D4s"'), 'Chromatic 12 C6 (G) contains E4 blow and D#4 draw');

// PowerChromatic
const chromPowerC = TuningEngine.generateChromaticHtml('chromatic12power', 'c');
assert(chromPowerC.includes('name="D4"') && chromPowerC.includes('name="E4"'), 'Chromatic 12 Power (C) contains D4 blow 2 and E4 draw 2');
const chromPowerD = TuningEngine.generateChromaticHtml('chromatic12power', 'd');
assert(chromPowerD.includes('name="E4"') && chromPowerD.includes('name="F4s"'), 'Chromatic 12 Power (D) contains E4 blow 2 and F#4 draw 2');

console.log('\n--- TEST 5: Chromatic 16 Tunings ---');
const chrom16SoloC = TuningEngine.generateChromaticHtml('chromatic16solo', 'c');
assert(chrom16SoloC.includes('name="C3"') && chrom16SoloC.includes('name="C3s"'), 'Chromatic 16 Solo (C) has C3 and C3s');
const chrom16BebopC = TuningEngine.generateChromaticHtml('chromatic16bebop', 'c');
assert(chrom16BebopC.includes('name="A3s"'), 'Chromatic 16 Bebop (C) contains Bb3 (A3s)');
const chrom16PowerC = TuningEngine.generateChromaticHtml('chromatic16power', 'c');
assert(chrom16PowerC.includes('name="C3"') && chrom16PowerC.includes('name="D3"'), 'Chromatic 16 Power (C) has C3 blow 1 and D3 draw 1');

console.log('\n--- TEST 7: Scales, Chords & Degree Formulas ---');
const { scales, keys, tones, noteNamesFlats, noteNames } = defs;

// Test Blues scale formula on C
const cBlues = scales.blues; // [1,0,0,1,1,1,0,1,0,0,1,0]
const cKeyNotes = keys.c; // ['c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b']
const activeBluesNotes = cKeyNotes.filter((n, i) => cBlues[i] === 1);
assert(JSON.stringify(activeBluesNotes) === JSON.stringify(['c', 'eb', 'f', 'fs', 'g', 'bb']), 'C Blues scale resolves C, Eb, F, F#, G, Bb');

// Test C Major scale formula
const cMajor = scales.major;
const activeMajorNotes = cKeyNotes.filter((n, i) => cMajor[i] === 1);
assert(JSON.stringify(activeMajorNotes) === JSON.stringify(['c', 'd', 'e', 'f', 'g', 'a', 'b']), 'C Major scale resolves C, D, E, F, G, A, B');

// Test C Maj7 Chord formula
const cMaj7 = scales.maj7chord;
const activeMaj7Notes = cKeyNotes.filter((n, i) => cMaj7[i] === 1);
assert(JSON.stringify(activeMaj7Notes) === JSON.stringify(['c', 'e', 'g', 'b']), 'C Maj7 chord resolves C, E, G, B');

// Test C Dom 7 Chord formula
const cD7 = scales.d7chord;
const activeD7Notes = cKeyNotes.filter((n, i) => cD7[i] === 1);
assert(JSON.stringify(activeD7Notes) === JSON.stringify(['c', 'e', 'g', 'bb']), 'C Dom 7 chord resolves C, E, G, Bb');

console.log('\n--- TEST 8: All Instruments in Menu Catalog ---');
assert(menu.allInstruments.includes("value='diatonicrichter'"), 'Menu includes Diatonic Richter');
assert(menu.allInstruments.includes("value='guitar'"), 'Menu includes Guitar');
assert(menu.allInstruments.includes("value='ukulele'"), 'Menu includes Ukulele');
assert(menu.allInstruments.includes("value='piano'"), 'Menu includes Piano');
assert(menu.allInstruments.includes("value='chromatic12solo'"), 'Menu includes Chromatic 12 Solo');
assert(menu.allInstruments.includes("value='chromatic16solo'"), 'Menu includes Chromatic 16 Solo');
assert(menu.instrument1 === menu.allInstruments, 'Bank 1 menu has all instruments');
assert(menu.instrument2 === menu.allInstruments, 'Bank 2 menu has all instruments');
assert(menu.instrument3 === menu.allInstruments, 'Bank 3 menu has all instruments');
assert(menu.instrument4 === menu.allInstruments, 'Bank 4 menu has all instruments');

console.log('\n--- TEST 9: Half-Valved Matrix Generation ---');
const valvedMatrix = TuningEngine.computeHarmonicaMatrix(
    HARMONICA_TUNINGS.diatonicrichter.blow.map(TuningEngine.noteToMidi),
    HARMONICA_TUNINGS.diatonicrichter.draw.map(TuningEngine.noteToMidi),
    true
);
// In half-valved mode, hole 1 blow can valve-bend down to B3 (59)
assert(valvedMatrix[1][0].name === 'B3' && valvedMatrix[1][0].type === 'valve-bend' && valvedMatrix[1][0].label === 'VB', 'H1 Half-Valved Blow has VB to B3');

console.log('\n--- TEST 10: HTML Generation for All Harmonica Tunings ---');
for (const tuningKey of Object.keys(HARMONICA_TUNINGS)) {
    const html = TuningEngine.generateHarmonicaHtml(tuningKey, 'c', false);
    assert(typeof html === 'string' && html.length > 50 && html.includes('table') === false, `${tuningKey} generates valid table rows`);
}

console.log('\n--- TEST 11: Guitar 24 Frets Generation ---');
const guitarHtml = TuningEngine.generateGuitarHtml('standard');
const guitarRows = guitarHtml.trim().split('</tr>').filter(r => r.includes('<tr'));
assert(guitarRows.length === 6, 'Guitar has 6 strings (rows)');
const cellCount = (guitarRows[0].match(/<td/g) || []).length;
assert(cellCount === 25, 'Guitar has 25 columns (open string + 24 frets)');

console.log('\n================================');
if (failures === 0) {
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
} else {
    console.error(`TOTAL FAILURES: ${failures}`);
    process.exit(1);
}

