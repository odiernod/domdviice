const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getTuningNotes,
  getDisplayTuningNotes,
  getChordPitchClasses,
  getScalePitchClasses,
  getScaleDegree,
  formatNoteName
} = require('./scripts/guitarprogression.js');

test('standard tuning matches the guitar order used in OmniTune', () => {
  assert.deepEqual(getTuningNotes('standard'), ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
});

test('drop d tuning preserves the low D string', () => {
  assert.deepEqual(getTuningNotes('dropd'), ['D2', 'A2', 'D3', 'G3', 'B3', 'E4']);
});

test('Eb standard tuning uses the expected low-to-high string order', () => {
  assert.deepEqual(getTuningNotes('ebstandard'), ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4']);
});

test('Perfect Fourths (allfourth) tuning resolves low-to-high EADGCF', () => {
  assert.deepEqual(getTuningNotes('allfourth'), ['E2', 'A2', 'D3', 'G3', 'C4', 'F4']);
  assert.deepEqual(getDisplayTuningNotes('allfourth'), ['F4', 'C4', 'G3', 'D3', 'A2', 'E2']);
});

test('Perfect Fourths Eb (ebfourths) tuning resolves low-to-high EbAbDbGbBE', () => {
  assert.deepEqual(getTuningNotes('ebfourths'), ['Eb2', 'Ab2', 'Db3', 'Gb3', 'B3', 'E4']);
  assert.deepEqual(getDisplayTuningNotes('ebfourths'), ['E4', 'B3', 'Gb3', 'Db3', 'Ab2', 'Eb2']);
});

test('display order shows the high E string at the top and the low E string at the bottom', () => {
  assert.deepEqual(getDisplayTuningNotes('standard'), ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']);
});

test('power chords use a root and fifth only', () => {
  assert.deepEqual(getChordPitchClasses('C5'), [0, 7]);
});

test('scale degrees use compact chord-tone notation', () => {
  assert.equal(getScaleDegree('C', 0), 'R');
  assert.equal(getScaleDegree('Cm', 3), 'b3');
  assert.equal(getScaleDegree('Cmaj7', 11), '7');
  assert.equal(getScaleDegree('C7', 10), 'b7');
});

test('scale pitch collections resolve major and minor pentatonic intervals', () => {
  assert.deepEqual(getScalePitchClasses('C', 'majorPentatonic'), [0, 2, 4, 7, 9]);
  assert.deepEqual(getScalePitchClasses('A', 'minorPentatonic'), [9, 0, 2, 4, 7]);
  assert.deepEqual(getScalePitchClasses('C', 'harmonicMinor'), [0, 2, 3, 5, 7, 8, 11]);
  assert.deepEqual(getScalePitchClasses('C', 'melodicMinor'), [0, 2, 3, 5, 7, 9, 11]);
});

test('Cmaj7 resolves to the major seventh chord formula', () => {
  assert.deepEqual(getChordPitchClasses('Cmaj7'), [0, 4, 7, 11]);
});

test('C7 resolves to the dominant seventh chord formula', () => {
  assert.deepEqual(getChordPitchClasses('C7'), [0, 4, 7, 10]);
});

test('OmniTune-style note names remain sharp-based and consistent', () => {
  assert.equal(formatNoteName('C#4'), 'C#4');
  assert.equal(formatNoteName('A#3'), 'A#3');
  assert.equal(formatNoteName('Bb3'), 'A#3');
});
