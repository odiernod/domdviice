const path = require('path');
const defs = require('../scripts/tuning_definitions.js');
// Put defs on global scope so engine can access them seamlessly
Object.assign(global, defs);

const { TuningEngine, instrument } = require('../scripts/tuning_engine.js');
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

console.log('\n--- TEST 6: Dropdown Menus & Proxy Compatibility ---');
const all12Keys = ['c', 'lowc', 'db', 'd', 'lowd', 'eb', 'e', 'lowe', 'lowf', 'f', 'fs', 'g', 'highg', 'ab', 'a', 'bb', 'b'];
all12Keys.forEach(k => {
    assert(menu.chromatic12solo.includes(`value='${k}'`), `Chromatic 12 Solo menu includes ${k}`);
    assert(menu.chromatic12bebop.includes(`value='${k}'`), `Chromatic 12 Bebop menu includes ${k}`);
    assert(menu.chromatic12c6.includes(`value='${k}'`), `Chromatic 12 C6 menu includes ${k}`);
    assert(menu.chromatic12power.includes(`value='${k}'`), `Chromatic 12 Power menu includes ${k}`);
    assert(menu.chromatic16solo.includes(`value='${k}'`), `Chromatic 16 Solo menu includes ${k}`);
});

assert(typeof instrument.chromatic12soloc === 'string', 'instrument.chromatic12soloc generates html');
assert(typeof instrument.chromatic12bebopg === 'string', 'instrument.chromatic12bebopg generates html');
assert(typeof instrument.chromatic12c6d === 'string', 'instrument.chromatic12c6d generates html');
assert(typeof instrument.chromatic12powerc === 'string', 'instrument.chromatic12powerc generates html');
assert(typeof instrument.chromatic16soloc === 'string', 'instrument.chromatic16soloc generates html');
assert(typeof instrument.guitarstandard === 'string', 'instrument.guitarstandard generates html');
assert(typeof instrument.pianostandard === 'string', 'instrument.pianostandard generates html');

console.log('\n================================');
if (failures === 0) {
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
} else {
    console.error(`TOTAL FAILURES: ${failures}`);
    process.exit(1);
}
