const path = require('path');
const defs = require('../scripts/tuning_definitions.js');
// Put defs on global scope so engine can access them seamlessly
Object.assign(global, defs);

const { TuningEngine, instrument } = require('../scripts/tuning_engine.js');
const { HARMONICA_TUNINGS, GUITAR_TUNINGS, UKULELE_TUNINGS } = defs;

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
assert(unvalvedMatrix[4][2].name === 'A4s' && unvalvedMatrix[4][2].label === "' bend", 'H3 Draw bend 1 is A4s (Bb4)');
assert(unvalvedMatrix[5][2].name === 'A4' && unvalvedMatrix[5][2].label === "'' bend", 'H3 Draw bend 2 is A4');
assert(unvalvedMatrix[6][2].name === 'G4s' && unvalvedMatrix[6][2].label === "''' bend", 'H3 Draw bend 3 is G4s (Ab4)');
assert(unvalvedMatrix[1][2].name === 'C5' && unvalvedMatrix[1][2].type === 'overblow', 'H3 Overblow is C5');

// Check Hole 8 (index 7): Blow E6 (88), Draw D6 (86)
assert(unvalvedMatrix[2][7].name === 'E6', 'H8 Blow is E6');
assert(unvalvedMatrix[3][7].name === 'D6', 'H8 Draw is D6');
assert(unvalvedMatrix[1][7].name === 'D6s' && unvalvedMatrix[1][7].type === 'blow-bend', 'H8 Blow bend is D6s (Eb6)');
assert(unvalvedMatrix[4][7].name === 'F6' && unvalvedMatrix[4][7].type === 'overdraw' && unvalvedMatrix[4][7].label === 'OD', 'H8 Overdraw is F6');

// Check Hole 10 (index 9): Blow C7 (96), Draw A6 (93)
assert(unvalvedMatrix[2][9].name === 'C7', 'H10 Blow is C7');
assert(unvalvedMatrix[3][9].name === 'A6', 'H10 Draw is A6');
assert(unvalvedMatrix[1][9].name === 'B6' && unvalvedMatrix[1][9].type === 'blow-bend' && unvalvedMatrix[1][9].label === "' bend", 'H10 Blow bend 1 is B6');
assert(unvalvedMatrix[0][9].name === 'A6s' && unvalvedMatrix[0][9].type === 'blow-bend' && unvalvedMatrix[0][9].label === "'' bend", 'H10 Blow bend 2 is A6s (Bb6)');
assert(unvalvedMatrix[4][9].name === 'C7s' && unvalvedMatrix[4][9].type === 'overdraw', 'H10 Overdraw is C7s (Db7)');

console.log('\n--- TEST 3: Standard Richter in C (Half-Valved) ---');
const valvedMatrix = TuningEngine.computeHarmonicaMatrix(
    HARMONICA_TUNINGS.diatonicrichter.blow.map(TuningEngine.noteToMidi),
    HARMONICA_TUNINGS.diatonicrichter.draw.map(TuningEngine.noteToMidi),
    true
);
// In Hole 1: Blow C4 (60) -> Valve bend is B3 (59)
assert(valvedMatrix[1][0].name === 'B3' && valvedMatrix[1][0].type === 'valve-bend' && valvedMatrix[1][0].label === 'VB', 'H1 Valve Bend is B3');
// In Hole 8: Draw D6 (86) -> Valve bend is C6s (85)
assert(valvedMatrix[4][7].name === 'C6s' && valvedMatrix[4][7].type === 'valve-bend' && valvedMatrix[4][7].label === 'VB', 'H8 Valve Bend is C6s (Db6)');
// In Hole 10: Draw A6 (93) -> Valve bend is G6s (92)
assert(valvedMatrix[4][9].name === 'G6s' && valvedMatrix[4][9].type === 'valve-bend' && valvedMatrix[4][9].label === 'VB', 'H10 Valve Bend is G6s (Ab6)');

console.log('\n--- TEST 4: Key Transposition ---');
const gHtml = TuningEngine.generateHarmonicaHtml('diatonicrichter', 'g', false);
assert(gHtml.includes('name="G3"'), 'Key of G starts with Blow 1 = G3');
assert(gHtml.includes('name="A3"'), 'Key of G has Draw 1 = A3');

console.log('\n--- TEST 5: Guitar & Ukulele Generators ---');
const guitarHtml = TuningEngine.generateGuitarHtml('standard');
assert(guitarHtml.includes('name="E4"'), 'Guitar standard contains E4');
assert(guitarHtml.includes('name="E2"'), 'Guitar standard contains E2');

const ukeHtml = TuningEngine.generateUkuleleHtml('sopranogcea');
assert(ukeHtml.includes('name="A4"'), 'Ukulele contains A4');

console.log('\n--- TEST 6: Proxy Compatibility ---');
assert(typeof instrument.diatonicrichterc === 'string' && instrument.diatonicrichterc.length > 50, 'instrument.diatonicrichterc generates html string');
assert(typeof instrument.guitarstandard === 'string' && instrument.guitarstandard.length > 50, 'instrument.guitarstandard generates html string');
assert(typeof instrument.pianostandard === 'string' && instrument.pianostandard.length > 50, 'instrument.pianostandard generates html string');
assert(typeof instrument.treble1 === 'string' && instrument.treble1.length > 50, 'instrument.treble1 generates html string');

console.log('\n================================');
if (failures === 0) {
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
} else {
    console.error(`TOTAL FAILURES: ${failures}`);
    process.exit(1);
}
