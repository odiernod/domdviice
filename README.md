# domdviice
An iteration of DVIICE originally by tigerhawkt3 which includes more harmonica tunings as well as a scale displayer

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
