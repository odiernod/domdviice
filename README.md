# OmniTune
**OmniTune: Compare Instruments, Tunings and Scales**

An instrument comparator, scale displayer, and tuning visualizer supporting piano, guitar, ukulele, and diverse harmonica tunings (Wilde, PowerBender, Paddy Richter, Chromatic, etc.), as well as a guitar chord progression visualizer and chord chart generator.

## Architecture
- **Pure JavaScript & Web Audio**: 100% client-side, zero build tools or backend dependencies required. Runs locally by opening `omnitune.html` in any browser.
- **Dynamic Tuning Engine**: Computes harmonica blow/draw/bend matrices, half-valved bends, chromatic slide registers, fretted fretboards, and piano octaves on the fly in `scripts/tuning_engine.js`.
- **HTML5 Canvas Visualizations**: Responsive, pixel-perfect diagrams rendered dynamically for guitars, ukuleles, harmonicas, and pianos.
- **Unit Testing**: Automated Node.js test runners:
  - `node tuning_engine.test.js` — validates all harmonica tunings, chromatic models, key offsets, scale and chord formulas.
  - `node guitarprogression.test.js` — validates guitar progressions, scale intervals, and chord formulas.

## Pages & Tools

### 1. OmniTune (`omnitune.html`)
The main instrument comparison and scale visualizer:
- **4 Universal Instrument Banks**: Compare any combination of 10-hole Diatonic Harmonicas (21 tunings with half-valving support), Chromatic Harmonicas (12- and 16-hole models across all keys), 6-String Guitars, 4-String Ukuleles, and Pianos.
- **Dynamic HTML5 Canvas Diagrams**: Clean, responsive, unshaded fretboards and harmonica reed plates with sharp note outlines and position markers.
- **Scales, Degrees & Accidentals Toggle**: Global Key and Scale selector with root emphasis, Nashville Number System degree labels, and a one-click toggle between Sharps (♯ / A#) and Flats (♭ / Bb).
- **Web Audio Sound**: Interactive note click/sweep with Pluck and Synth playback modes.
- **Sticky Control Bar & Responsive Layout**: Sticky top header and dynamic side-by-side card arrangement for compact instruments.
- **Instrument Diagram Printing**: Dedicated Print button on every bank with auto-scaled landscape paper formatting, custom metadata headers, and full fidelity to active note name, scale degree, and highlight settings.

### 2. Guitar Chord Finder & Progression Visualizer (`guitarprogression.html`)
An interactive fretboard and harmonic progression explorer for guitarists:
- **Tuning Catalog**: Standard (EADGBE), Eb Standard, Drop D, DADGAD, Open C, Open E, BEBEBE, Open G, Open D.
- **Chord & Scale Modes**: Switch between Chord mode (Roots, Qualities, and Standard/Shell Voicings) and Scale mode (Major, Minor, Pentatonic, Blues, Dorian, Phrygian, Lydian, Mixolydian).
- **Chord Progression Builder**: Construct multi-chord progressions with color-coded badges, and hover/click chord badges to highlight their chord tones on the fretboard.
- **Fretboard Customization**: Toggle scale degrees, note names, and position markers on an interactive 24-fret diagram.

### 3. Chord Chart Generator (`chordchartgenerator.html`)
A standalone generator for chord fingering box diagrams:
- Configurable frets, strings, starting fret, mute markers (`X`), open circles (`O`), finger numbers, dot colors, and custom bottom labels.
- Export directly to high-resolution PNG with white background.
- URL-driven configuration ideal for programmatic generation and LLM integrations.

---

## Chord Chart Generator — LLM parameter reference

This project contains a chord-chart generator page that accepts configuration via UI controls or URL query parameters and can export the diagram as a PNG with a white background. Provide the parameters listed below to generate diagrams programmatically (for example, from an LLM).

### Top-level parameters (query names / UI ids)
- `chord` (id: `chordInput`)  
  - Type: string — chord name shown in the title. Default: empty.
- `tuning` (id: `tuningInput`)  
  - Type: string — tuning text displayed in the title. Default: `EADGBE`.
- `frets` (id: `fretsInput`)  
  - Type: integer (1–24) — number of frets to display. Default: `5`.
- `strings` (id: `stringsInput`)  
  - Type: integer (1–12) — number of strings. Default: `6`.
- `start` (id: `startInput`)  
  - Type: integer (>=0) — starting fret shown (0 = nut). Default: `0`.

### Per-string parameters (for each string index i = 0..strings-1)
- `s{i}_muted`  
  - Type: `0` or `1`. `1` = muted (draw an X). Default: `0`.
- `s{i}_fret`  
  - Type: integer (>= -1). `-1` or muted flag → treated as muted; `0` → open string (small circle above nut); `>0` → fret position (dot). Default: `0`.
- `s{i}_finger`  
  - Type: integer (-1..5). Finger number shown inside the fret dot; `-1` = none. Default: `-1`.
- `s{i}_color`  
  - Type: one of `[black, red, green, blue, yellow, white]`.  
  - Meaning: color for fretted/open dots. Muted strings always draw an X in red regardless of color param. Default: fretted → `black`, open → `white`.
- `s{i}_label`  
  - Type: string. If non-empty, this replaces the default bottom label (string number) for that string. Default: empty (shows default string number).

### Notes & constraints
- Limits: frets 1–24, strings 1–12, finger -1..5.
- Muted detection: `s{i}_muted=1` OR `s{i}_fret=-1` marks muted.
- Saved PNG: the export composites the canvas onto a white background; filename is `(chord || "chord") + ".png"`.
- URL length: typical configurations (up to 12 strings) are small (<1KB). For very large or many annotations, consider encoding the entire config (JSON → base64 or compressed) into a single `cfg` parameter or use server/local storage with an id.

### Example URL snippets
- Simple E major:
  /chordchartgenerator.html?chord=E&strings=6&frets=5&s0_fret=0&s1_fret=2&s1_finger=2&s2_fret=2&s2_finger=3&s3_fret=1&s3_finger=1&s4_fret=0&s5_fret=0

- Full per-string explicit (6 strings):
  /chordchartgenerator.html?chord=G&strings=6&frets=5&start=0&s0_muted=0&s0_fret=3&s0_finger=2&s0_color=black&s0_label=&s1_muted=0&s1_fret=0&s1_finger=-1&s1_color=white&s1_label=&... (repeat for s2..s5)

If you want, I can provide a compact JSON→base64 encode/decode snippet and the URL change required to accept a single `cfg` parameter to avoid long query
