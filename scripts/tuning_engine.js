/**
 * OmniTune: Programmatic Tuning Engine & Diatonic Harmonica Physics
 */

const TuningEngine = (function() {
    // Note parsing and MIDI conversions
    const BASE_NOTE_SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

    function noteToMidi(noteStr) {
        if (!noteStr || typeof noteStr !== 'string') return null;
        const clean = noteStr.trim();
        // Match 'C#4', 'Db4', 'C4s', 'C4', etc.
        const match = clean.match(/^([A-Ga-g])([#b]?)([0-7])([s]?)$/i);
        if (!match) return null;
        const [, letter, preAcc, octaveStr, postAcc] = match;
        let semitone = BASE_NOTE_SEMITONES[letter.toUpperCase()];
        if (preAcc === '#' || postAcc.toLowerCase() === 's') semitone += 1;
        else if (preAcc === 'b') semitone -= 1;
        const octave = parseInt(octaveStr, 10);
        return 12 + octave * 12 + semitone;
    }

    function midiToNoteId(midi) {
        if (midi === null || midi === undefined) return '';
        const octave = Math.floor((midi - 12) / 12);
        const semitone = (midi - 12) % 12;
        const baseNames = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
        const isSharp = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0][semitone];
        const letter = baseNames[semitone];
        return isSharp ? `${letter}${octave}s` : `${letter}${octave}`;
    }

    function midiToFrequency(midi) {
        if (midi === null || midi === undefined) return 0;
        return +(440 * Math.pow(2, (midi - 69) / 12)).toFixed(2);
    }

    // Active matrix store for canvas renderer to access note metadata per bank
    const harmonicaMatrices = {
        instrument1: null,
        instrument2: null,
        instrument3: null,
        instrument4: null
    };

    /**
     * Calculates the complete 7-row harmonica pitch matrix and note metadata.
     * @param {Array<number>} blowReedsMidi - 10 blow reeds in MIDI numbers
     * @param {Array<number>} drawReedsMidi - 10 draw reeds in MIDI numbers
     * @param {boolean} isHalfValved        - Whether windsavers are active
     * @returns {Array<Array<Object|null>>}
     */
    function computeHarmonicaMatrix(blowReedsMidi, drawReedsMidi, isHalfValved = false) {
        // Grid rows:
        // 0: double blow bend ('')
        // 1: single blow bend (') / overblow (OB) / blow valve bend (VB)
        // 2: BLOW REED
        // 3: DRAW REED
        // 4: single draw bend (') / overdraw (OD) / draw valve bend (VB)
        // 5: double draw bend ('')
        // 6: triple draw bend (''')
        const matrix = Array.from({ length: 7 }, () => Array(10).fill(null));

        for (let h = 0; h < 10; h++) {
            const B = blowReedsMidi[h];
            const D = drawReedsMidi[h];

            matrix[2][h] = {
                midi: B,
                name: midiToNoteId(B),
                tone: midiToFrequency(B),
                type: 'blow',
                label: 'BLOW'
            };

            matrix[3][h] = {
                midi: D,
                name: midiToNoteId(D),
                tone: midiToFrequency(D),
                type: 'draw',
                label: 'DRAW'
            };

            if (D > B) {
                // Dual-reed draw bends
                const diff = D - B - 1;
                if (diff >= 1) {
                    const m = D - 1;
                    matrix[4][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'draw-bend', label: 'DB' };
                }
                if (diff >= 2) {
                    const m = D - 2;
                    matrix[5][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'draw-bend', label: 'DB' };
                }
                if (diff >= 3) {
                    const m = D - 3;
                    matrix[6][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'draw-bend', label: 'DB' };
                }

                // Row 1 (above blow reed): Overblow vs Blow Valve Bend
                if (isHalfValved) {
                    const m = B - 1;
                    matrix[1][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'valve-bend', label: 'VB' };
                } else {
                    const m = D + 1;
                    matrix[1][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'overblow', label: 'OB' };
                }
            } else if (B > D) {
                // Dual-reed blow bends
                const diff = B - D - 1;
                if (diff >= 1) {
                    const m = B - 1;
                    matrix[1][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'blow-bend', label: 'BB' };
                }
                if (diff >= 2) {
                    const m = B - 2;
                    matrix[0][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'blow-bend', label: 'BB' };
                }

                // Row 4 (below draw reed): Overdraw vs Draw Valve Bend
                if (isHalfValved) {
                    const m = D - 1;
                    matrix[4][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'valve-bend', label: 'VB' };
                } else {
                    const m = B + 1;
                    matrix[4][h] = { midi: m, name: midiToNoteId(m), tone: midiToFrequency(m), type: 'overdraw', label: 'OD' };
                }
            }
        }

        return matrix;
    }

    /**
     * Generates HTML table for a 10-hole diatonic harmonica.
     */
    function generateHarmonicaHtml(type, key = 'c', isHalfValved = null, bankId = null) {
        const tuningDef = HARMONICA_TUNINGS[type] || HARMONICA_TUNINGS.diatonicrichter;
        const effectiveValved = (isHalfValved !== null) ? isHalfValved : !!tuningDef.isHalfValvedDefault;

        let offset = 0;
        const normalizedKey = (key || (tuningDef.isMinor ? (tuningDef.baseKey || 'cm') : 'c')).toLowerCase();
        if (tuningDef.isMinor) {
            const baseKey = (tuningDef.baseKey || 'cm').toLowerCase();
            const baseOffset = (HARMONICA_MINOR_KEY_OFFSETS[baseKey] !== undefined)
                ? HARMONICA_MINOR_KEY_OFFSETS[baseKey]
                : (HARMONICA_KEY_OFFSETS[baseKey] ?? 0);
            const targetOffset = (HARMONICA_MINOR_KEY_OFFSETS[normalizedKey] !== undefined)
                ? HARMONICA_MINOR_KEY_OFFSETS[normalizedKey]
                : (HARMONICA_KEY_OFFSETS[normalizedKey] ?? 0);
            offset = targetOffset - baseOffset;
        } else {
            offset = (HARMONICA_KEY_OFFSETS[normalizedKey] !== undefined)
                ? HARMONICA_KEY_OFFSETS[normalizedKey]
                : (HARMONICA_MINOR_KEY_OFFSETS[normalizedKey] ?? 0);
        }

        const blowMidi = tuningDef.blow.map(n => noteToMidi(n) + offset);
        const drawMidi = tuningDef.draw.map(n => noteToMidi(n) + offset);

        const matrix = computeHarmonicaMatrix(blowMidi, drawMidi, effectiveValved);
        if (bankId && harmonicaMatrices.hasOwnProperty(bankId)) {
            harmonicaMatrices[bankId] = matrix;
        }

        return matrix.map(row => {
            const cells = row.map(cell => {
                if (!cell) {
                    return `<td><img src="blank.png" width="63" height="63"></td>`;
                }
                return `<td><img name="${cell.name}" tone="${cell.tone}" src="blank.png" width="63" height="63"></td>`;
            }).join('\n');
            return `<tr>\n${cells}\n</tr>`;
        }).join('\n');
    }

    /**
     * Generates HTML table for Guitar.
     */
    function generateGuitarHtml(tuningKey = 'standard', frets = 22) {
        const tuning = GUITAR_TUNINGS[tuningKey] || GUITAR_TUNINGS.standard;
        let html = '';
        for (const openNote of tuning.strings) {
            const baseMidi = noteToMidi(openNote);
            html += '<tr>\n';
            for (let f = 0; f <= frets; f++) {
                const midi = baseMidi + f;
                const name = midiToNoteId(midi);
                const tone = midiToFrequency(midi);
                html += `<td><img name="${name}" tone="${tone}" src="blank.png" width="63" height="63"></td>\n`;
            }
            html += '</tr>\n';
        }
        return html;
    }

    /**
     * Generates HTML table for Ukulele.
     */
    function generateUkuleleHtml(tuningKey = 'sopranogcea', frets = 15) {
        const tuning = UKULELE_TUNINGS[tuningKey] || UKULELE_TUNINGS.sopranogcea;
        let html = '';
        for (const openNote of tuning.strings) {
            const baseMidi = noteToMidi(openNote);
            html += '<tr>\n';
            for (let f = 0; f <= frets; f++) {
                const midi = baseMidi + f;
                const name = midiToNoteId(midi);
                const tone = midiToFrequency(midi);
                html += `<td><img name="${name}" tone="${tone}" src="blank.png" width="63" height="63"></td>\n`;
            }
            html += '</tr>\n';
        }
        return html;
    }

    /**
     * Generates HTML table for Chromatic Harmonicas (12 or 16 hole: Solo, Bebop, C6, PowerChromatic).
     */
    function generateChromaticHtml(type = 'chromatic12solo', tuningKey = 'c') {
        const typeStr = (type || 'chromatic12solo').toLowerCase();
        const is16 = typeStr.includes('16');
        let family = 'solo';
        if (typeStr.includes('bebop')) family = 'bebop';
        else if (typeStr.includes('c6')) family = 'c6';
        else if (typeStr.includes('power')) family = 'power';

        const def = (typeof CHROMATIC_TUNINGS !== 'undefined' && CHROMATIC_TUNINGS[family])
            ? CHROMATIC_TUNINGS[family]
            : (typeof CHROMATIC_TUNINGS !== 'undefined' ? CHROMATIC_TUNINGS.solo : null);

        let blowBase, drawBase;
        if (def) {
            blowBase = is16 ? def.blow16 : def.blow12;
            drawBase = is16 ? def.draw16 : def.draw12;
        } else {
            // Fallback
            blowBase = is16
                ? ["C3","E3","G3","C4", "C4","E4","G4","C5", "C5","E5","G5","C6", "C6","E6","G6","C7"]
                : ["C4","E4","G4","C5", "C5","E5","G5","C6", "C6","E6","G6","C7"];
            drawBase = is16
                ? ["D3","F3","A3","B3", "D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"]
                : ["D4","F4","A4","B4", "D5","F5","A5","B5", "D6","F6","A6","B6"];
        }

        const normKey = (tuningKey || 'c').toLowerCase();
        let offset = 0;
        if (is16) {
            if (normKey === 'c4') {
                offset = 12;
            } else if (normKey === 'c3' || normKey === 'c') {
                offset = 0;
            } else {
                offset = (typeof HARMONICA_KEY_OFFSETS !== 'undefined' && HARMONICA_KEY_OFFSETS[normKey] !== undefined)
                    ? HARMONICA_KEY_OFFSETS[normKey]
                    : 0;
            }
        } else {
            // Chromatic 12
            if (normKey === 'c3' || normKey === 'lowc') {
                offset = -12;
            } else if (normKey === 'c4' || normKey === 'c') {
                offset = 0;
            } else {
                offset = (typeof HARMONICA_KEY_OFFSETS !== 'undefined' && HARMONICA_KEY_OFFSETS[normKey] !== undefined)
                    ? HARMONICA_KEY_OFFSETS[normKey]
                    : 0;
            }
        }

        const blowMidi = blowBase.map(n => noteToMidi(n) + offset);
        const drawMidi = drawBase.map(n => noteToMidi(n) + offset);

        // Row 0: Blow Slide In (+1 semitone)
        // Row 1: Blow Slide Out
        // Row 2: Draw Slide Out
        // Row 3: Draw Slide In (+1 semitone)
        const rows = [
            blowMidi.map(m => m + 1),
            blowMidi,
            drawMidi,
            drawMidi.map(m => m + 1)
        ];

        return rows.map(r => {
            const cells = r.map(midi => {
                const name = midiToNoteId(midi);
                const tone = midiToFrequency(midi);
                return `<td><img name="${name}" tone="${tone}" src="blank.png" width="63" height="63"></td>`;
            }).join('\n');
            return `<tr>\n${cells}\n</tr>`;
        }).join('\n');
    }

    /**
     * Generates HTML table for Piano.
     */
    function generatePianoHtml() {
        let html = '';
        for (let oct = 1; oct <= 7; oct++) {
            html += '<tr>\n';
            const baseMidi = 12 + oct * 12; // C1 = 24, C2 = 36, etc.
            for (let s = 0; s < 12; s++) {
                const midi = baseMidi + s;
                const name = midiToNoteId(midi);
                const tone = midiToFrequency(midi);
                html += `<td><img class="noNoteNames" name="${name}" tone="${tone}" src="blank.png" width="63" height="63"></td>\n`;
            }
            html += '</tr>\n';
        }
        return html;
    }

    /**
     * Generates Staff clefs (treble1..4, bass1..4).
     */
    const staffNoteConfigs = {
        treble1: [
            { name: "A7", tone: 3520, w: 27, h: 31 },
            { name: "F7", tone: 2793.83, w: 27, h: 31 },
            { name: "D7", tone: 2349.32, w: 27, h: 31 },
            { name: "B6", tone: 1975.53, w: 27, h: 31 },
            { name: "G6", tone: 1567.98, w: 27, h: 31 },
            { name: "E6", tone: 1318.51, w: 27, h: 29 },
            { name: "C6", tone: 1046.5, w: 27, h: 29 },
            { name: "A5", tone: 880, w: 27, h: 29 },
            { name: "F5", tone: 698.46, w: 27, h: 29 },
            { name: "D5", tone: 587.33, w: 27, h: 31 },
            { name: "B4", tone: 493.88, w: 27, h: 31 },
            { name: "G4", tone: 392, w: 27, h: 29 },
            { name: "E4", tone: 329.63, w: 27, h: 31 },
            { name: "C4", tone: 261.63, w: 27, h: 30 }
        ],
        treble2: [
            { name: "B7", tone: 3951.07, w: 27, h: 31 },
            { name: "G7", tone: 3135.96, w: 27, h: 31 },
            { name: "E7", tone: 2637.02, w: 27, h: 31 },
            { name: "C7", tone: 2093, w: 27, h: 30 },
            { name: "A6", tone: 1760, w: 27, h: 30 },
            { name: "F6", tone: 1396.91, w: 27, h: 30 },
            { name: "D6", tone: 1174.66, w: 27, h: 29 },
            { name: "B5", tone: 987.77, w: 27, h: 29 },
            { name: "G5", tone: 783.99, w: 27, h: 31 },
            { name: "E5", tone: 659.26, w: 27, h: 31 },
            { name: "C5", tone: 523.25, w: 27, h: 31 },
            { name: "A4", tone: 440, w: 27, h: 29 },
            { name: "F4", tone: 349.23, w: 27, h: 31 },
            { name: "D4", tone: 293.66, w: 27, h: 31 }
        ],
        treble3: [
            { name: "C7s", tone: 2217.46, w: 27, h: 30 },
            { name: "A6s", tone: 1864.66, w: 27, h: 30 },
            { name: "F6s", tone: 1479.98, w: 27, h: 30 },
            { name: "D6s", tone: 1244.51, w: 27, h: 30 },
            { name: "C6s", tone: 1108.73, w: 27, h: 30 },
            { name: "A5s", tone: 932.33, w: 27, h: 30 },
            { name: "F5s", tone: 739.99, w: 27, h: 30 },
            { name: "D5s", tone: 622.25, w: 27, h: 30 },
            { name: "C5s", tone: 554.37, w: 27, h: 30 },
            { name: "A4s", tone: 466.16, w: 27, h: 30 },
            { name: "F4s", tone: 369.99, w: 27, h: 30 },
            { name: "D4s", tone: 311.13, w: 27, h: 30 },
            { name: "C4s", tone: 277.18, w: 27, h: 30 }
        ],
        treble4: [
            { name: "G7s", tone: 3322.44, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "D7s", tone: 2489.02, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "G6s", tone: 1661.22, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "D6s", tone: 1244.51, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "G5s", tone: 830.61, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "D5s", tone: 622.25, w: 27, h: 30 },
            { blank: true, w: 27, h: 20 },
            { name: "G4s", tone: 415.3, w: 27, h: 30 }
        ],
        bass1: [
            { name: "C4", tone: 261.63, w: 27, h: 30 },
            { name: "A3", tone: 220, w: 27, h: 30 },
            { name: "F3", tone: 174.61, w: 27, h: 30 },
            { name: "D3", tone: 146.83, w: 27, h: 30 },
            { name: "B2", tone: 123.47, w: 27, h: 33 },
            { name: "G2", tone: 98, w: 27, h: 29 },
            { name: "E2", tone: 82.41, w: 27, h: 31 },
            { name: "C2", tone: 65.41, w: 27, h: 30 },
            { name: "A1", tone: 55, w: 27, h: 31 },
            { name: "F1", tone: 43.65, w: 27, h: 30 },
            { name: "D1", tone: 36.71, w: 27, h: 29 }
        ],
        bass2: [
            { name: "B3", tone: 246.94, w: 27, h: 29 },
            { name: "G3", tone: 196, w: 27, h: 29 },
            { name: "E3", tone: 164.81, w: 27, h: 31 },
            { name: "C3", tone: 130.81, w: 27, h: 31 },
            { name: "A2", tone: 110, w: 27, h: 30 },
            { name: "F2", tone: 87.31, w: 27, h: 31 },
            { name: "D2", tone: 73.42, w: 27, h: 31 },
            { name: "B1", tone: 61.74, w: 27, h: 30 },
            { name: "G1", tone: 49, w: 27, h: 30 },
            { name: "E1", tone: 41.2, w: 27, h: 31 },
            { name: "C1", tone: 32.7, w: 27, h: 29 }
        ],
        bass3: [
            { name: "C4s", tone: 277.18, w: 27, h: 30 },
            { name: "A3s", tone: 233.08, w: 27, h: 30 },
            { name: "F3s", tone: 185, w: 27, h: 29 },
            { blank: true, w: 27, h: 20 },
            { name: "C3s", tone: 138.59, w: 27, h: 29 },
            { name: "A2s", tone: 116.54, w: 27, h: 29 },
            { name: "F2s", tone: 92.5, w: 27, h: 29 },
            { blank: true, w: 27, h: 20 },
            { name: "C2s", tone: 69.3, w: 27, h: 29 },
            { name: "A1s", tone: 58.27, w: 27, h: 29 },
            { name: "F1s", tone: 46.25, w: 27, h: 29 },
            { blank: true, w: 27, h: 20 },
            { name: "C1s", tone: 34.65, w: 27, h: 29 }
        ],
        bass4: [
            { name: "G3s", tone: 207.65, w: 27, h: 26 },
            { blank: true, w: 27, h: 21 },
            { name: "D3s", tone: 155.56, w: 27, h: 26 },
            { blank: true, w: 27, h: 35 },
            { name: "G2s", tone: 103.83, w: 27, h: 26 },
            { blank: true, w: 27, h: 23 },
            { name: "D2s", tone: 77.78, w: 27, h: 26 },
            { blank: true, w: 27, h: 33 },
            { name: "G1s", tone: 51.91, w: 27, h: 26 },
            { blank: true, w: 27, h: 21 },
            { name: "D1s", tone: 38.89, w: 27, h: 26 }
        ]
    };

    function generateStaffHtml(clefId) {
        const notes = staffNoteConfigs[clefId];
        if (!notes) return '';
        return notes.map(n => {
            if (n.blank) {
                return `<tr>\n<td><img width="${n.w}" height="${n.h}"></td>\n</tr>`;
            }
            return `<tr>\n<td><img class="noNoteNames" name="${n.name}" tone="${n.tone}" width="${n.w}" height="${n.h}"></td>\n</tr>`;
        }).join('\n');
    }

    /**
     * Master instrument generator.
     */
    function generateInstrumentHtml(type, tuning, isHalfValved = null, bankId = null) {
        if (!type) type = 'diatonicrichter';
        if (type === 'guitar') {
            return generateGuitarHtml(tuning || 'standard');
        }
        if (type === 'ukulele') {
            return generateUkuleleHtml(tuning || 'sopranogcea');
        }
        if (type === 'piano') {
            return generatePianoHtml();
        }
        if (type && (type.startsWith('chromatic12') || type.startsWith('chromatic16'))) {
            return generateChromaticHtml(type, tuning);
        }
        if (staffNoteConfigs.hasOwnProperty(type)) {
            return generateStaffHtml(type);
        }
        // Diatonic 10-hole harmonica
        return generateHarmonicaHtml(type, tuning, isHalfValved, bankId);
    }

    return {
        noteToMidi,
        midiToNoteId,
        midiToFrequency,
        computeHarmonicaMatrix,
        generateHarmonicaHtml,
        generateGuitarHtml,
        generateUkuleleHtml,
        generateChromaticHtml,
        generatePianoHtml,
        generateStaffHtml,
        generateInstrumentHtml,
        harmonicaMatrices
    };
})();

// Create dynamic global `instrument` Proxy for full backward compatibility
const instrument = new Proxy({}, {
    get: function(target, prop) {
        if (typeof prop !== 'string') return target[prop];
        if (target.hasOwnProperty(prop)) return target[prop];

        // Check if staff
        if (['treble1','treble2','treble3','treble4','bass1','bass2','bass3','bass4'].includes(prop)) {
            return TuningEngine.generateStaffHtml(prop);
        }
        if (prop.startsWith('piano')) {
            return TuningEngine.generatePianoHtml();
        }
        if (prop.startsWith('guitar')) {
            const tuningKey = prop.substring('guitar'.length) || 'standard';
            return TuningEngine.generateGuitarHtml(tuningKey);
        }
        if (prop.startsWith('ukulele')) {
            const tuningKey = prop.substring('ukulele'.length) || 'sopranogcea';
            return TuningEngine.generateUkuleleHtml(tuningKey);
        }
        if (prop.startsWith('chromatic12')) {
            const remainder = prop.substring('chromatic12'.length);
            let chromType = 'chromatic12solo';
            let key = 'c';
            if (remainder.startsWith('bebop')) {
                chromType = 'chromatic12bebop';
                key = remainder.substring('bebop'.length) || 'c';
            } else if (remainder.startsWith('c6')) {
                chromType = 'chromatic12c6';
                key = remainder.substring('c6'.length) || 'c';
            } else if (remainder.startsWith('power')) {
                chromType = 'chromatic12power';
                key = remainder.substring('power'.length) || 'c';
            } else if (remainder.startsWith('solo')) {
                chromType = 'chromatic12solo';
                key = remainder.substring('solo'.length) || 'c';
            } else {
                key = remainder || 'c';
            }
            return TuningEngine.generateChromaticHtml(chromType, key);
        }
        if (prop.startsWith('chromatic16')) {
            const remainder = prop.substring('chromatic16'.length);
            let chromType = 'chromatic16solo';
            let key = 'c';
            if (remainder.startsWith('bebop')) {
                chromType = 'chromatic16bebop';
                key = remainder.substring('bebop'.length) || 'c';
            } else if (remainder.startsWith('c6')) {
                chromType = 'chromatic16c6';
                key = remainder.substring('c6'.length) || 'c';
            } else if (remainder.startsWith('power')) {
                chromType = 'chromatic16power';
                key = remainder.substring('power'.length) || 'c';
            } else if (remainder.startsWith('solo')) {
                chromType = 'chromatic16solo';
                key = remainder.substring('solo'.length) || 'c';
            } else {
                key = remainder || 'c';
            }
            return TuningEngine.generateChromaticHtml(chromType, key);
        }

        // Try to match 10-hole harmonica types
        for (const harmType of Object.keys(HARMONICA_TUNINGS)) {
            if (prop.startsWith(harmType)) {
                const key = prop.substring(harmType.length) || 'c';
                return TuningEngine.generateHarmonicaHtml(harmType, key);
            }
        }

        return target[prop] || '';
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TuningEngine,
        instrument
    };
}
