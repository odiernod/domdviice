(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.GuitarProgression = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const TUNINGS = {
    standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    ebstandard: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4'],
    dropd: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    dadgad: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
    openc: ['C2', 'G2', 'C3', 'G3', 'C4', 'E4'],
    opene: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
    bebebe: ['B1', 'E2', 'B2', 'E3', 'B3', 'E4'],
    openg: ['E2', 'B2', 'G3', 'D4', 'G4', 'E5'],
    opend: ['D2', 'A2', 'F3', 'C4', 'G4', 'D5']
  };

  const CHORD_LIBRARY = {
    C: [0, 4, 7],
    Cm: [0, 3, 7],
    Cmaj7: [0, 4, 7, 11],
    C7: [0, 4, 7, 10],
    D: [2, 6, 9],
    Dm: [2, 5, 9],
    D7: [2, 6, 9, 12],
    E: [4, 7, 11],
    Em: [4, 7, 12],
    E7: [4, 7, 10],
    F: [5, 9, 12],
    Fm: [5, 8, 12],
    G: [7, 11, 14],
    Gm: [7, 10, 14],
    G7: [7, 11, 14, 17],
    A: [9, 13, 16],
    Am: [9, 12, 16],
    A7: [9, 13, 16, 19],
    B: [11, 15, 18],
    Bm: [11, 14, 18],
    B7: [11, 15, 18, 21],
    'C#': [1, 5, 8],
    Db: [1, 5, 8],
    'D#': [3, 7, 10],
    Eb: [3, 7, 10],
    'F#': [6, 10, 13],
    Gb: [6, 10, 13],
    'G#': [8, 12, 15],
    Ab: [8, 12, 15],
    'A#': [10, 14, 17],
    Bb: [10, 14, 17]
  };

  function normalizeRoot(root) {
    const value = String(root || '').trim();
    if (!value) return 'C';
    const map = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
    return map[value] || value;
  }

  function noteToMidi(noteName) {
    const match = /^([A-G])([#b]?)(\d)$/.exec(String(noteName || '').trim());
    if (!match) return null;

    const letter = match[1];
    const accidental = match[2] || '';
    const octave = Number(match[3]);
    const pitchMap = {
      C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11
    };

    const key = accidental === 'b' ? `${letter}b` : `${letter}${accidental}`;
    const semitone = pitchMap[key] ?? 0;
    return ((octave + 1) * 12) + semitone;
  }

  function formatNoteName(noteName) {
    const match = /^([A-G])([#b]?)(\d)$/.exec(String(noteName || '').trim());
    if (!match) return String(noteName || '');

    const letter = match[1];
    const accidental = match[2] || '';
    const octave = Number(match[3]);
    const midi = noteToMidi(`${letter}${accidental}${octave}`);
    if (midi === null) return String(noteName || '');

    const semitone = midi % 12;
    const name = NOTE_NAMES[semitone];
    return `${name}${octave}`;
  }

  function getTuningNotes(tuningKey) {
    return (TUNINGS[tuningKey] || TUNINGS.standard).slice();
  }

  function getDisplayTuningNotes(tuningKey) {
    return getTuningNotes(tuningKey).slice().reverse();
  }

  function getChordPitchClasses(chordName) {
    const raw = String(chordName || '').trim();
    if (!raw) return [];

    const match = /^([A-G](?:#|b)?)(.*)$/.exec(raw);
    if (!match) return [];

    const root = normalizeRoot(match[1]);
    const suffix = (match[2] || '').toLowerCase();

    let offsets = null;
    if (suffix === '' || suffix === 'maj' || suffix === 'major') offsets = [0, 4, 7];
    else if (suffix === 'm' || suffix === 'min' || suffix === 'minor') offsets = [0, 3, 7];
    else if (suffix === 'maj7' || suffix === 'major7') offsets = [0, 4, 7, 11];
    else if (suffix === '7') offsets = [0, 4, 7, 10];
    else if (suffix === 'm7' || suffix === 'min7' || suffix === 'minor7') offsets = [0, 3, 7, 10];
    else if (suffix === '5') offsets = [0, 7];
    else if (suffix === 'dim' || suffix === 'diminished') offsets = [0, 3, 6];
    else if (suffix === 'aug' || suffix === 'augmented') offsets = [0, 4, 8];
    else if (suffix === 'sus2') offsets = [0, 2, 7];
    else if (suffix === 'sus4') offsets = [0, 5, 7];
    else if (suffix === 'add9') offsets = [0, 4, 7, 14];
    else if (suffix === '9') offsets = [0, 4, 7, 10, 14];
    else if (suffix === 'm9' || suffix === 'min9' || suffix === 'minor9') offsets = [0, 3, 7, 10, 14];
    else if (CHORD_LIBRARY[raw]) offsets = CHORD_LIBRARY[raw];
    else if (CHORD_LIBRARY[root + suffix]) offsets = CHORD_LIBRARY[root + suffix];
    else offsets = CHORD_LIBRARY[root] || [0, 4, 7];

    const rootMidi = noteToMidi(`${root}4`);
    if (rootMidi === null) return [];

    const basePitchClass = rootMidi % 12;
    return [...new Set(offsets.map((offset) => (basePitchClass + offset) % 12))].sort((a, b) => a - b);
  }

  const SCALE_INTERVALS = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
    melodicMinor: [0, 2, 3, 5, 7, 9, 11],
    majorPentatonic: [0, 2, 4, 7, 9],
    minorPentatonic: [0, 3, 5, 7, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10]
  };

  function getScalePitchClasses(rootName, scaleName) {
    const root = normalizeRoot(rootName);
    const rootMidi = noteToMidi(`${root}4`);
    const intervals = SCALE_INTERVALS[scaleName];
    if (rootMidi === null || !intervals) return [];
    return intervals.map((interval) => (rootMidi % 12 + interval) % 12);
  }

  function getScaleDegree(chordName, pitchClass) {
    const raw = String(chordName || '').trim();
    const match = /^([A-G](?:#|b)?)/.exec(raw);
    if (!match) return '';

    const root = normalizeRoot(match[1]);
    const rootMidi = noteToMidi(`${root}4`);
    if (rootMidi === null || !Number.isInteger(pitchClass)) return '';

    const interval = (pitchClass - (rootMidi % 12) + 12) % 12;
    const degrees = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
    return degrees[interval];
  }

  function getShellVoicingPitchClasses(chordName) {
    const raw = String(chordName || '').trim();
    if (!raw) return [];

    const match = /^([A-G](?:#|b)?)(.*)$/.exec(raw);
    if (!match) return [];

    const root = normalizeRoot(match[1]);
    const suffix = (match[2] || '').toLowerCase();
    const full = getChordPitchClasses(raw);
    const rootMidi = noteToMidi(`${root}4`);
    if (rootMidi === null) return full;

    const base = rootMidi % 12;

    let preferred = [0, 7];
    if (suffix === 'm' || suffix === 'min' || suffix === 'minor') preferred = [0, 3, 7];
    else if (suffix === 'maj7' || suffix === 'major7') preferred = [0, 4, 11];
    else if (suffix === '7') preferred = [0, 4, 10];
    else if (suffix === 'm7' || suffix === 'min7' || suffix === 'minor7') preferred = [0, 3, 10];
    else if (suffix === 'dim' || suffix === 'diminished') preferred = [0, 3, 6];
    else if (suffix === 'aug' || suffix === 'augmented') preferred = [0, 4, 8];
    else if (suffix === 'sus2') preferred = [0, 2, 7];
    else if (suffix === 'sus4') preferred = [0, 5, 7];
    else if (suffix === '5') preferred = [0, 7];
    else preferred = [0, 4, 7];

    return [...new Set(preferred.map((offset) => (base + offset) % 12))].sort((a, b) => a - b);
  }

  function fretNoteForString(openNote, fret) {
    const baseMidi = noteToMidi(openNote);
    if (baseMidi === null) return null;

    const targetMidi = baseMidi + fret;
    const noteNumber = targetMidi % 12;
    const octave = Math.floor(targetMidi / 12) - 1;
    return `${NOTE_NAMES[noteNumber]}${octave}`;
  }

  function getChordPositions(chordName, tuningKey, maxFret = 24, voicing = 'standard') {
    const tuning = getTuningNotes(tuningKey);
    const pitchClasses = new Set(
      voicing === 'shell' ? getShellVoicingPitchClasses(chordName) : getChordPitchClasses(chordName)
    );
    const results = [];

    tuning.forEach((openNote, stringIndex) => {
      for (let fret = 0; fret <= maxFret; fret += 1) {
        const note = fretNoteForString(openNote, fret);
        if (!note) continue;

        const noteMidi = noteToMidi(note);
        if (noteMidi === null) continue;
        if (pitchClasses.has(noteMidi % 12)) {
          results.push({ stringIndex, fret, note, pitchClass: noteMidi % 12 });
        }
      }
    });

    return results;
  }

  function getScalePositions(rootName, scaleName, tuningKey, maxFret = 24) {
    const tuning = getTuningNotes(tuningKey);
    const pitchClasses = new Set(getScalePitchClasses(rootName, scaleName));
    const results = [];

    tuning.forEach((openNote, stringIndex) => {
      for (let fret = 0; fret <= maxFret; fret += 1) {
        const note = fretNoteForString(openNote, fret);
        if (!note) continue;
        const noteMidi = noteToMidi(note);
        if (noteMidi !== null && pitchClasses.has(noteMidi % 12)) {
          results.push({ stringIndex, fret, note, pitchClass: noteMidi % 12 });
        }
      }
    });

    return results;
  }

  return {
    NOTE_NAMES,
    TUNINGS,
    CHORD_LIBRARY,
    noteToMidi,
    formatNoteName,
    getTuningNotes,
    getDisplayTuningNotes,
    getChordPitchClasses,
    getScalePitchClasses,
    getScaleDegree,
    getShellVoicingPitchClasses,
    fretNoteForString,
    getChordPositions,
    getScalePositions
  };
}));
