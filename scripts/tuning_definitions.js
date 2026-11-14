/**
 * OmniTune: Tuning Definitions and Music Theory Metadata
 */

const HARMONICA_KEY_OFFSETS = {
    lowc: -12,
    lowd: -10,
    lowe: -8,
    lowf: -7,
    g: -5,
    ab: -4,
    a: -3,
    bb: -2,
    b: -1,
    c: 0,
    db: 1,
    d: 2,
    eb: 3,
    e: 4,
    f: 5,
    fs: 6,
    highg: 7
};

// Minor keys map to semitone shifts relative to C
const HARMONICA_MINOR_KEY_OFFSETS = {
    lowc: -12,
    lowcm: -12,
    lowd: -10,
    lowdm: -10,
    lowe: -8,
    lowem: -8,
    lowf: -7,
    lowfm: -7,
    g: -5,
    gm: -5,
    ab: -4,
    abm: -4,
    a: -3,
    am: -3,
    bb: -2,
    bbm: -2,
    b: -1,
    bm: -1,
    c: 0,
    cm: 0,
    db: 1,
    dbm: 1,
    d: 2,
    dm: 2,
    eb: 3,
    ebm: 3,
    e: 4,
    em: 4,
    f: 5,
    fm: 5,
    fs: 6,
    fsm: 6,
    highg: 7,
    highgm: 7
};

const HARMONICA_TUNINGS = {
    diatonicrichter: {
        name: "Richter Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        draw: ["D4", "G4", "B4", "D5", "F5", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    paddyrichtertuned: {
        name: "Paddy Richter Harmonica",
        blow: ["C4", "E4", "A4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        draw: ["D4", "G4", "B4", "D5", "F5", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    countrytuned: {
        name: "Country Tuned Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        draw: ["D4", "G4", "B4", "D5", "F5s", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    easythirdtuned: {
        name: "Easy Third Tuned Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        draw: ["D4", "F4", "A4", "D5", "F5", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    melodymakertuned: {
        name: "Melody Maker Harmonica",
        blow: ["C4", "E4", "A4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        draw: ["D4", "G4", "B4", "D5", "F5s", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    diatonicminor: {
        name: "Natural Minor Harmonica",
        isMinor: true,
        // In key of Cm:
        blow: ["F3", "Ab3", "C4", "F4", "Ab4", "C5", "F5", "Ab5", "C6", "F6"],
        draw: ["G3", "C4", "Eb4", "G4", "Bb4", "C5", "Eb5", "G5", "Bb5", "D6"],
        isHalfValvedDefault: false
    },
    diatonicpowerbender: {
        name: "PowerBender Harmonica",
        blow: ["C4", "E4", "G4", "C5", "D5", "F5", "A5", "C6", "E6", "A6"],
        draw: ["D4", "G4", "B4", "D5", "E5", "G5", "B5", "D6", "G6", "C7"],
        isHalfValvedDefault: false
    },
    powerdrawtuned: {
        name: "PowerDraw Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "G5", "A5", "C6", "E6", "A6"],
        draw: ["D4", "G4", "B4", "D5", "F5", "A5", "B5", "D6", "G6", "C7"],
        isHalfValvedDefault: false
    },
    powerchromatic10tuning: {
        name: "Power Chromatic 10 Harmonica",
        blow: ["C5", "D5", "F5", "A5", "C6", "D6", "F6", "A6", "C7", "D7"],
        draw: ["D5", "E5", "G5", "B5", "D6", "E6", "G6", "B6", "D7", "E7"],
        isHalfValvedDefault: false
    },
    diatonicwildetuned: {
        name: "Wilde Tuned Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "E5", "G5", "C6", "E6", "A6"],
        draw: ["D4", "G4", "B4", "D5", "F5", "G5", "B5", "D6", "G6", "C7"],
        isHalfValvedDefault: false
    },
    diatonicwildeminor: {
        name: "Wilde Minor Harmonica",
        isMinor: true,
        // In key of Am (offset 0 for Am template):
        baseKey: "am",
        blow: ["D4", "F4", "A4", "D5", "F5", "F5", "A5", "D6", "F6", "B6"],
        draw: ["E4", "A4", "C5", "E5", "G5", "A5", "C6", "E6", "A6", "D7"],
        isHalfValvedDefault: false
    },
    paddywildetuned: {
        name: "Paddy Wilde Harmonica",
        blow: ["C4", "E4", "A4", "C5", "E5", "E5", "A5", "C6", "E6", "A6"],
        draw: ["D4", "G4", "B4", "D5", "F5", "G5", "B5", "D6", "G6", "C7"],
        isHalfValvedDefault: false
    },
    dorianwildealtered: {
        name: "Dom's 'Dorian Shred' Altered Wilde Tuned Harmonica",
        blow: ["C4", "E4", "G4", "C5", "D5", "E5", "G5", "C6", "E6", "A6"],
        draw: ["D4", "G4", "Bb4", "D5", "F5", "G5", "Bb5", "D6", "G6", "C7"],
        isHalfValvedDefault: false
    },
    domshredwildeminor: {
        name: "Dom's 'Shred Minor' 2.5 Octave Tuned Harmonica",
        isMinor: true,
        // In key of Am (offset 0 for Am template):
        baseKey: "am",
        blow: ["D4", "F4", "A4", "D5", "F5", "F5", "A5", "D6", "F6", "F6"],
        draw: ["E4", "A4", "C5", "E5", "G5", "A5", "C6", "E6", "G6", "A6"],
        isHalfValvedDefault: false
    },
    paddy123tuned: {
        name: "Paddy Richter Extended Harmonica",
        blow: ["C4", "E4", "A4", "C5", "E5", "A5", "C6", "E6", "A6", "C7"],
        draw: ["D4", "G4", "B4", "D5", "G5", "B5", "D6", "G6", "B6", "D7"],
        isHalfValvedDefault: false
    },
    easydiatonic: {
        name: "Easy Diatonic Harmonica",
        blow: ["A3", "C4", "E4", "A4", "C5", "E5", "A5", "C6", "E6", "A6"],
        draw: ["B3", "D4", "G4", "B4", "D5", "G5", "B5", "D6", "G6", "B6"],
        isHalfValvedDefault: false
    },
    sunnyrbtuned: {
        name: "Sunny Regular Breath Harmonica",
        blow: ["C4", "E4", "G4", "C5", "E5", "G5", "A5", "C6", "E6", "G6"],
        draw: ["D4", "G4", "B4", "D5", "F5", "A5", "B5", "D6", "F6", "A6"],
        isHalfValvedDefault: false
    },
    diminished10: {
        name: "Diminished 10 hole Harmonica",
        blow: ["C4", "Eb4", "Gb4", "A4", "C5", "Eb5", "Gb5", "A5", "C6", "Eb6"],
        draw: ["D4", "F4", "Ab4", "B4", "D5", "F5", "Ab5", "B5", "D6", "F6"],
        isHalfValvedDefault: false
    },
    augmented10: {
        name: "Augmented 10 hole Harmonica",
        blow: ["C4", "E4", "Ab4", "C5", "E5", "Ab5", "C6", "E6", "Ab6", "C7"],
        draw: ["Eb4", "G4", "B4", "Eb5", "G5", "B5", "Eb6", "G6", "B6", "Eb7"],
        isHalfValvedDefault: false
    },
    wholetone10: {
        name: "Whole Tone 10 hole Harmonica",
        blow: ["C4", "E4", "Ab4", "C5", "E5", "Ab5", "C6", "E6", "Ab6", "C7"],
        draw: ["D4", "Gb4", "Bb4", "D5", "Gb5", "Bb5", "D6", "Gb6", "Bb6", "D7"],
        isHalfValvedDefault: false
    },
};

const GUITAR_TUNINGS = {
    standard:       { name: "Standard EADGBE", strings: ["E4", "B3", "G3", "D3", "A2", "E2"] },
    eb:             { name: "Eb Standard Eb-Ab-Db-Gb-Bb-Eb", strings: ["Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2"] },
    opena:          { name: "Open A EAEAC#E", strings: ["E4", "C#4", "A3", "E3", "A2", "E2"] },
    openb:          { name: "Open B BF#BF#BD#", strings: ["D#4", "B3", "F#3", "B2", "F#2", "B1"] },
    openc:          { name: "Open C CGCGCE", strings: ["E4", "C4", "G3", "C3", "G2", "C2"] },
    opend:          { name: "Open D DADF#AD", strings: ["D4", "A3", "F#3", "D3", "A2", "D2"] },
    opene:          { name: "Open E EBEG#BE", strings: ["E4", "B3", "G#3", "E3", "B2", "E2"] },
    openem:         { name: "Open Em EBEGBE", strings: ["E4", "B3", "G3", "E3", "B2", "E2"] },
    openealt:       { name: "Open E Alt EG#BEBE", strings: ["E4", "B3", "E3", "B2", "G#2", "E2"] },
    openf:          { name: "Open F FACFCF", strings: ["F4", "C4", "F3", "C3", "A2", "F2"] },
    openg:          { name: "Open G DGDGBD", strings: ["D4", "B3", "G3", "D3", "G2", "D2"] },
    dobro:          { name: "Dobro GBDGBD", strings: ["D4", "B3", "G3", "D3", "B2", "G2"] },
    allfourth:      { name: "Perfect Fourths EADGCF", strings: ["F4", "C4", "G3", "D3", "A2", "E2"] },
    ebfourths:      { name: "Perfect Fourths EbAbDbGbBE", strings: ["E4", "B3", "Gb3", "Db3", "Ab2", "Eb2"] },
    allthirds:      { name: "All thirds E-Gb-C-E-Gb-C", strings: ["C4", "Gb3", "E3", "C3", "Gb2", "E2"] },
    dadgad:         { name: "DADGAD", strings: ["D4", "A3", "G3", "D3", "A2", "D2"] },
    lowd:           { name: "Low D", strings: ["D4", "A3", "F#3", "D3", "A2", "D1"] },
    dropd:          { name: "Drop D DADGBE", strings: ["E4", "B3", "G3", "D3", "A2", "D2"] },
    dropdg:         { name: "Drop DG DGDGBE", strings: ["E4", "B3", "G3", "D3", "G2", "D2"] },
    eaeabe:         { name: "Asus2 EAEABE", strings: ["E4", "B3", "A3", "E3", "A2", "E2"] },
    easyesus2:      { name: "Easy Esus2 EF#BEBE", strings: ["E4", "B3", "E3", "B2", "F#2", "E2"] },
    threeflats:     { name: "E-Ab-Db-Gb-B-E", strings: ["E4", "B3", "Gb3", "Db3", "Ab2", "E2"] },
    esus2exp:       { name: "Esus2 Experimental F#EBEBE", strings: ["E4", "B3", "E3", "B2", "E2", "F#2"] },
    cfcfcf:         { name: "F5 CFCFCF", strings: ["F4", "C4", "F3", "C3", "F2", "C2"] },
    bebebe:         { name: "E5 BEBEBE", strings: ["E4", "B3", "E3", "B2", "E2", "B1"] },
    dgdgcf:         { name: "DGDGCF", strings: ["F4", "C4", "G3", "D3", "G2", "D2"] },
    doubledropd:    { name: "Double drop D DADGBD", strings: ["D4", "B3", "G3", "D3", "A2", "D2"] },
    dadgaddropc:    { name: "DADGAD drop C", strings: ["D4", "A3", "G3", "D3", "A2", "C2"] },
    baritonefourth: { name: "Baritone p. 4th BEADF#B", strings: ["B3", "F#3", "D3", "A2", "E2", "B1"] },
    baritonefifth:  { name: "Baritone p. 5th ADGCEA", strings: ["A3", "E3", "C3", "G2", "D2", "A1"] },
    baritonethird:  { name: "Baritone m. 3rd CFA#D#GC", strings: ["C4", "G3", "D#3", "A#2", "F2", "C2"] }
};

const UKULELE_TUNINGS = {
    sopranogcea:  { name: "Soprano GCEA", strings: ["A4", "E4", "C4", "G4"] }, // re-entrant
    sopranoadfsb: { name: "Soprano ADF#B", strings: ["B4", "F#4", "D4", "A4"] },
    tenorlinear:  { name: "Tenor linear", strings: ["A4", "E4", "C4", "G3"] },
    tenordgbe:    { name: "Tenor DGBE", strings: ["E4", "B3", "G3", "D3"] },
    baritone:     { name: "Baritone DGBE", strings: ["E4", "B3", "G3", "D3"] },
    bass:         { name: "Bass EADG", strings: ["G2", "D2", "A1", "E1"] },
    sopraninocfad:{ name: "Sopranino CFAD", strings: ["D5", "A4", "F4", "C5"] },
    sopraninodgbe:{ name: "Sopranino DGBE", strings: ["E5", "B4", "G4", "D5"] }
};

const CHROMATIC_TUNINGS = {
    solo: {
        name: "Solo Tuned",
        blow12: ["C4","E4","G4","C5", "C5","E5","G5","C6", "C6","E6","G6","C7"],
        draw12: ["D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"],
        blow16: ["C3","E3","G3","C4", "C4","E4","G4","C5", "C5","E5","G5","C6", "C6","E6","G6","C7"],
        draw16: ["D3","F3","A3","B3", "D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"]
    },
    bebop: {
        name: "Bebop Tuned",
        blow12: ["C4","E4","G4","Bb4", "C5","E5","G5","Bb5", "C6","E6","G6","Bb6"],
        draw12: ["D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"],
        blow16: ["C3","E3","G3","Bb3", "C4","E4","G4","Bb4", "C5","E5","G5","Bb5", "C6","E6","G6","Bb6"],
        draw16: ["D3","F3","A3","B3", "D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"]
    },
    c6: {
        name: "C6 / Minor 7th Tuned",
        blow12: ["C4","E4","G4","A4", "C5","E5","G5","A5", "C6","E6","G6","A6"],
        draw12: ["D4","F4","G#4","B4", "D5","F5","G#5","B5", "D6","F6","G#6","B6"],
        blow16: ["C3","E3","G3","A3", "C4","E4","G4","A4", "C5","E5","G5","A5", "C6","E6","G6","A6"],
        draw16: ["D3","F3","G#3","B3", "D4","F4","G#4","B4", "D5","F5","G#5","B5", "D6","F6","G#6","B6"]
    },
    power: {
        name: "PowerChromatic Tuned",
        blow12: ["C4","D4","F4","A4", "C5","D5","F5","A5", "C6","D6","F6","A6"],
        draw12: ["D4","E4","G4","B4", "D5","E5","G5","B5", "D6","E6","G6","B6"],
        blow16: ["C3","D3","F3","A3", "C4","D4","F4","A4", "C5","D5","F5","A5", "C6","D6","F6","A6"],
        draw16: ["D3","E3","G3","B3", "D4","E4","G4","B4", "D5","E5","G5","B5", "D6","E6","G6","B6"]
    }
};

const img = {};

// Keys, tones, scales definitions preserved for scales and degree highlight features
const keys = {
    g: ['g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'fs'],
    ab: ['ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g'],
    a: ['a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab'],
    bb: ['bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a'],
    b: ['b', 'c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb'],
    c: ['c', 'db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b'],
    db: ['db', 'd', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b', 'c'],
    d: ['d', 'eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db'],
    eb: ['eb', 'e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd'],
    e: ['e', 'f', 'fs', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb'],
    f: ['f', 'fs', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e'],
    fs: ['fs', 'g', 'ab', 'a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f']
};

const tones = {
    g: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'],
    ab: ['G1s', 'G2s', 'G3s', 'G4s', 'G5s', 'G6s', 'G7s'],
    a: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
    bb: ['A1s', 'A2s', 'A3s', 'A4s', 'A5s', 'A6s', 'A7s'],
    b: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
    c: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
    db: ['C1s', 'C2s', 'C3s', 'C4s', 'C5s', 'C6s', 'C7s'],
    d: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
    eb: ['D1s', 'D2s', 'D3s', 'D4s', 'D5s', 'D6s', 'D7s'],
    e: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7'],
    f: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'],
    fs: ['F1s', 'F2s', 'F3s', 'F4s', 'F5s', 'F6s', 'F7s']
};

const scales = {
    blues: [1,0,0,1,0,1,1,1,0,0,1,0],
    minorpentatonic: [1,0,0,1,0,1,0,1,0,0,1,0],
    majorpentatonic: [1,0,1,0,1,0,0,1,0,1,0,0],
    major: [1,0,1,0,1,1,0,1,0,1,0,1],
    naturalminor: [1,0,1,1,0,1,0,1,1,0,1,0],
    harmonicminor: [1,0,1,1,0,1,0,1,1,0,0,1],
    melodicminor: [1,0,1,1,0,1,0,1,0,1,0,1],
    mixolydian: [1,0,1,0,1,1,0,1,0,1,1,0],
    mixeduplydian: [1,0,1,1,1,1,1,1,0,1,1,0],
    dorian: [1,0,1,1,0,1,0,1,0,1,1,0],
    aeolian: [1,0,1,1,0,1,0,1,1,0,1,0],
    phrygian: [1,1,0,1,0,1,0,1,1,0,1,0],
    locrian: [1,1,0,1,0,1,1,0,1,0,1,0],
    lydian: [1,0,1,0,1,0,1,1,0,1,0,1],
    gypsyminor: [1,0,1,1,0,0,1,1,1,0,0,1],
    gypsymajor: [1,1,0,0,1,1,0,1,1,0,0,1],
    harmonicmajor: [1,0,1,0,1,1,0,1,1,0,0,1],
    bebop: [1,0,1,0,1,1,0,1,1,1,0,1],
    bebopminor: [1,0,1,1,0,1,0,1,1,1,0,1],
    bebopsubdominant: [1,0,1,0,1,1,0,1,0,1,1,1],
    hindu: [1,0,1,0,1,1,0,1,1,0,1,0],
    spanish: [1,1,0,0,1,1,0,1,1,0,1,0],
    wholetone: [1,0,1,0,1,0,1,0,1,0,1,0],
    fullchromatic: [1,1,1,1,1,1,1,1,1,1,1,1],
    majchord: [1,0,0,0,1,0,0,1,0,0,0,0],
    d7chord: [1,0,0,0,1,0,0,1,0,0,1,0],
    maj7chord: [1,0,0,0,1,0,0,1,0,0,0,1],
    mchord: [1,0,0,1,0,0,0,1,0,0,0,0],
    m7chord: [1,0,0,1,0,0,0,1,0,0,1,0],
    sus2chord: [1,0,1,0,0,0,0,1,0,0,0,0],
    sus4chord: [1,0,0,0,0,1,0,1,0,0,0,0],
    add9chord: [1,0,1,0,1,0,0,1,0,0,0,0],
    augchord: [1,0,0,0,1,0,0,0,1,0,0,0],
    maj6chord: [1,0,0,0,1,0,0,1,0,1,0,0],
    maj6add9chord: [1,0,1,0,1,0,0,1,0,1,0,0],
    m6chord: [1,0,0,1,0,0,0,1,0,1,0,0],
    m6add9chord: [1,0,1,1,0,0,0,1,0,1,0,0],
    d7sus4chord: [1,0,0,0,0,1,0,1,0,0,1,0],
    diminishedchord: [1,0,0,1,0,0,1,0,0,0,0,0],
    diminished7chord: [1,0,0,1,0,0,1,0,0,0,1,0],
    mmaj7chord: [1,0,0,1,0,0,0,1,0,0,0,1],
    d9chord: [1,0,1,0,1,0,0,1,0,0,1,0],
    m9chord: [1,0,1,1,0,0,0,1,0,0,1,0],
    maj9chord: [1,0,1,0,1,0,0,1,0,0,0,1],
    powerchord: [1,0,0,0,0,0,0,1,0,0,0,0]
};

const noteNamesFlats = {};
const noteNames = {};
const noteNamesAbs = {};

// Programmatically generate note name lookup tables
(function buildNoteNameMaps() {
    const semitonesSharp = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    const semitonesFlat  = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
    for (let oct = 0; oct <= 8; oct++) {
        for (let s = 0; s < 12; s++) {
            const baseLetter = ['C','C','D','D','E','F','F','G','G','A','A','B'][s];
            const isSharp = [0,1,0,1,0,0,1,0,1,0,1,0][s] === 1;
            const id = isSharp ? `${baseLetter}${oct}s` : `${baseLetter}${oct}`;
            noteNamesFlats[id] = semitonesFlat[s];
            noteNames[id] = semitonesSharp[s];
            noteNamesAbs[id] = `${semitonesSharp[s]}${oct}`;
        }
    }
})();

// Build dynamic dropdown menus
const menu = {};

(function buildMenus() {
    // Harmonica tuning keys
    const standardKeys = `
<option value='c'>C</option>
<option value='lowc'>Low C</option>
<option value='db'>Db</option>
<option value='d'>D</option>
<option value='lowd'>Low D</option>
<option value='eb'>Eb</option>
<option value='e'>E</option>
<option value='lowe'>Low E</option>
<option value='lowf'>Low F</option>
<option value='f'>F</option>
<option value='fs'>Gb / F#</option>
<option value='g'>G</option>
<option value='highg'>High G</option>
<option value='ab'>Ab</option>
<option value='a'>A</option>
<option value='bb'>Bb</option>
<option value='b'>B</option>
`;

    const minorKeys = `
<option value='cm'>Cm</option>
<option value='lowcm'>Low Cm</option>
<option value='dbm'>Dbm</option>
<option value='dm'>Dm</option>
<option value='lowdm'>Low Dm</option>
<option value='ebm'>Ebm</option>
<option value='em'>Em</option>
<option value='lowem'>Low Em</option>
<option value='lowfm'>Low Fm</option>
<option value='fm'>Fm</option>
<option value='fsm'>F#m / Gbm</option>
<option value='gm'>Gm</option>
<option value='highgm'>High Gm</option>
<option value='abm'>Abm</option>
<option value='am'>Am</option>
<option value='bbm'>Bbm</option>
<option value='bm'>Bm</option>
`;

    for (const key of Object.keys(HARMONICA_TUNINGS)) {
        if (HARMONICA_TUNINGS[key].isMinor) {
            menu[key] = minorKeys;
        } else {
            menu[key] = standardKeys;
        }
    }

    // Guitar options
    menu.guitar = Object.keys(GUITAR_TUNINGS).map(k =>
        `<option value='${k}'>${GUITAR_TUNINGS[k].name}</option>`
    ).join('\n');

    // Ukulele options
    menu.ukulele = Object.keys(UKULELE_TUNINGS).map(k =>
        `<option value='${k}'>${UKULELE_TUNINGS[k].name}</option>`
    ).join('\n');

    // Chromatics (All 12 keys + octave variants available for all chromatic tunings)
    const chromaticKeys = `
<option value='c'>C</option>
<option value='lowc'>Low C (Tenor C)</option>
<option value='db'>Db</option>
<option value='d'>D</option>
<option value='lowd'>Low D</option>
<option value='eb'>Eb</option>
<option value='e'>E</option>
<option value='lowe'>Low E</option>
<option value='lowf'>Low F</option>
<option value='f'>F</option>
<option value='fs'>Gb / F#</option>
<option value='g'>G</option>
<option value='highg'>High G</option>
<option value='ab'>Ab</option>
<option value='a'>A</option>
<option value='bb'>Bb</option>
<option value='b'>B</option>
`;

    menu.chromatic12solo = chromaticKeys;
    menu.chromatic12bebop = chromaticKeys;
    menu.chromatic12c6 = chromaticKeys;
    menu.chromatic12power = chromaticKeys;
    menu.chromatic12 = chromaticKeys;

    menu.chromatic16solo = chromaticKeys;
    menu.chromatic16bebop = chromaticKeys;
    menu.chromatic16c6 = chromaticKeys;
    menu.chromatic16power = chromaticKeys;
    menu.chromatic16 = chromaticKeys;

    menu.piano = "<option value='standard'>Standard</option>";

    const harmonicaInstrumentOptions = Object.keys(HARMONICA_TUNINGS).map(k =>
        `<option value='${k}'>${HARMONICA_TUNINGS[k].name}</option>`
    ).join('\n');

    const chromaticInstrumentOptions = `
<option value='chromatic12solo'>Chromatic 12 (Solo)</option>
<option value='chromatic12bebop'>Chromatic 12 (Bebop)</option>
<option value='chromatic12c6'>Chromatic 12 (C6)</option>
<option value='chromatic12power'>Chromatic 12 (PowerChromatic)</option>
<option value='chromatic16solo'>Chromatic 16 (Solo)</option>
<option value='chromatic16bebop'>Chromatic 16 (Bebop)</option>
<option value='chromatic16c6'>Chromatic 16 (C6)</option>
<option value='chromatic16power'>Chromatic 16 (PowerChromatic)</option>
`;

    const allInstrumentOptions = `
<optgroup label="10-Hole Diatonic Harmonicas">
${harmonicaInstrumentOptions}
</optgroup>
<optgroup label="Chromatic Harmonicas">
${chromaticInstrumentOptions}
</optgroup>
<optgroup label="Fretted & Keyboard Instruments">
<option value='guitar'>Guitar</option>
<option value='ukulele'>Ukulele</option>
<option value='piano'>Piano</option>
</optgroup>
`;

    menu.allInstruments = allInstrumentOptions;
    menu.instrument1 = allInstrumentOptions;
    menu.instrument2 = allInstrumentOptions;
    menu.instrument3 = allInstrumentOptions;
    menu.instrument4 = allInstrumentOptions;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HARMONICA_KEY_OFFSETS,
        HARMONICA_MINOR_KEY_OFFSETS,
        HARMONICA_TUNINGS,
        GUITAR_TUNINGS,
        UKULELE_TUNINGS,
        CHROMATIC_TUNINGS,
        img,
        keys,
        tones,
        scales,
        noteNamesFlats,
        noteNames,
        noteNamesAbs,
        menu
    };
}
