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
        const effectiveValved = (isHalfValved !== null && isHalfValved !== undefined) ? !!isHalfValved : false;

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
        generateInstrumentHtml,
        harmonicaMatrices
    };
})();

// Create dynamic global `instrument` Proxy for full backward compatibility
const instrument = new Proxy({}, {
    get: function(target, prop) {
        if (typeof prop !== 'string') return target[prop];
        if (target.hasOwnProperty(prop)) return target[prop];

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
