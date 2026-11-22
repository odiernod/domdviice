/* ============================================================================
   OmniTune — Pillar-Based Guided Practice Curriculum
   Grounded in "The Architecture of Melodic Improvisation"
   Universal (Instrument-Agnostic), Active Song Key Adaptive, 100% Offline
   ============================================================================ */
(function (global) {
  'use strict';

  const CHROMATIC = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const MAJOR_SCALE_SEMIS = [0, 2, 4, 5, 7, 9, 11];

  function keyPc(key) {
    const idx = CHROMATIC.indexOf(key);
    return idx >= 0 ? idx : 0;
  }

  function noteAt(key, semi) {
    const pc = ((keyPc(key) + semi) % 12 + 12) % 12;
    return CHROMATIC[pc];
  }

  function chordAt(key, semi, suffix) {
    return `${noteAt(key, semi)}${suffix || ''}`;
  }

  // Reusable chord-building helpers (all relative to active Song Key via `semi`)
  const c = (semi, q, rn, bars = 1) => ({ semi, q, rn, bars, inversion: 0 });

  const BLUES_12 = [
    c(0, '7', 'I7'), c(0, '7', 'I7'), c(0, '7', 'I7'), c(0, '7', 'I7'),
    c(5, '7', 'IV7'), c(5, '7', 'IV7'), c(0, '7', 'I7'), c(0, '7', 'I7'),
    c(7, '7', 'V7'), c(5, '7', 'IV7'), c(0, '7', 'I7'), c(7, '7', 'V7')
  ];

  const POP_4_LOOP = [
    c(0, 'maj', 'I'), c(9, 'm', 'vi'), c(5, 'maj', 'IV'), c(7, 'maj', 'V')
  ];

  const POP_AXIS = [
    c(0, 'maj', 'I'), c(7, 'maj', 'V'), c(9, 'm', 'vi'), c(5, 'maj', 'IV')
  ];

  const ROCK_MIXOLYDIAN = [
    c(0, 'maj', 'I'), c(10, 'maj', '♭VII'), c(5, 'maj', 'IV'), c(0, 'maj', 'I')
  ];

  const JAZZ_II_V_I_VI = [
    c(2, 'm7', 'iim7'), c(7, '7', 'V7'), c(0, 'maj7', 'Imaj7'), c(9, '7', 'VI7')
  ];

  const MINOR_II_V_I = [
    c(2, 'm7b5', 'iiø7'), c(7, '7', 'V7'), c(0, 'm7', 'im7'), c(0, 'm6', 'im6')
  ];

  const ANDALUSIAN = [
    c(0, 'm', 'i'), c(10, 'maj', '♭VII'), c(8, 'maj7', '♭VImaj7'), c(7, '7', 'V7')
  ];

  const DORIAN_FUNK = [
    c(0, 'm7', 'im7', 2), c(5, '7', 'IV7', 2)
  ];

  const PRACTICE_PILLARS = [
    /* =========================================================================
       PILLAR 1: MOTIF ANATOMY & REAL-TIME TRANSFORMATION
       ========================================================================= */
    {
      id: 'motif-anatomy',
      number: 1,
      icon: '🧬',
      title: 'Motif Anatomy & Transformation',
      tagline: 'Turn 2–4 notes into a complete solo instead of running scales.',
      philosophy: 'Genuine melodic improvisation is spontaneous composition, not rapid scale retrieval. By restricting yourself to a tiny 3-note motif and molding it through repetition, rhythmic stretching, inversion, and the Rule of Three, you break mechanical muscle memory and build memorable musical narratives.',
      lessons: [
        {
          id: 'p1-l1-three-note-rule',
          code: 'P1.1',
          level: 'Foundation',
          title: 'The 3-Note Rule & Space',
          summary: 'Lock into degrees 1, 3, and 5 only, using quarter/half notes and mandatory 2-beat pauses.',
          why: (k) => `Restricting your pitch choices to just three notes (${noteAt(k, 0)}, ${noteAt(k, 4)}, ${noteAt(k, 7)}) shuts down habitual scale-running reflexes. With nowhere to hide melodically, your ear immediately takes over rhythm, phrasing, dynamics, and space.`,
          listenFor: (k) => [
            `Did you stay strictly inside ${noteAt(k, 0)}, ${noteAt(k, 4)}, and ${noteAt(k, 7)} without sneaking in a 4th pitch?`,
            'Did every 2-bar phrase leave at least 2 full beats of complete silence before the next idea?',
            'Did your notes land with calm, deliberate tone rather than rushed noodling?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Neuro-Motor Isolation (Metronome Only)',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Practice with the metronome only at 75 BPM. Use ONLY degrees 1, 3, and 5 in ${k} (${noteAt(k, 0)}, ${noteAt(k, 4)}, ${noteAt(k, 7)}). Build 2-bar motifs using strictly quarter notes and half notes, leaving at least 2 full beats of silence after every statement.`,
              beatCue: { mode: 'quarter', targets: [0], label: 'Steady quarter/half-note pulse + 2 beats of rest' },
              config: {
                progression: [c(0, 'maj', 'I', 2)],
                bpm: 75,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'palette',
                  semis: [0, 4, 7],
                  labels: { 0: '1', 4: '3', 7: '5' },
                  badge: '3-Note Palette (1–3–5)'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Static Groove Pocket',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over the static ${chordAt(k, 0, 'maj7')} groove, lock your 3-note motifs (${noteAt(k, 0)}–${noteAt(k, 4)}–${noteAt(k, 7)}) tightly to the rhythm section. Aim to resolve each phrase cleanly onto ${noteAt(k, 0)} (1) or ${noteAt(k, 4)} (3) and breathe for 2 beats.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 78,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'palette',
                  semis: [0, 4, 7],
                  labels: { 0: '1', 4: '3', 7: '5' },
                  badge: '3-Note Palette (1–3–5)'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'I – IV Vamp Synthesis',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over the ${chordAt(k, 0, '')} – ${chordAt(k, 5, '')} vamp using strictly your 3 notes (${noteAt(k, 0)}, ${noteAt(k, 4)}, ${noteAt(k, 7)}). Notice how the exact same 3 pitches shift color over ${chordAt(k, 5, '')} (${noteAt(k, 0)} becomes the 5th, ${noteAt(k, 4)} the Maj7, ${noteAt(k, 7)} the lush 9th!). Keep leaving 2 beats of space every 2 bars.`,
              config: {
                progression: [c(0, 'maj', 'I', 2), c(5, 'maj', 'IV', 2)],
                bpm: 82,
                chordTimbre: 'epiano',
                compStyle: 'folk_strum',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'palette',
                  semis: [0, 4, 7],
                  labels: { 0: '1', 4: '3', 7: '5' },
                  badge: '3-Note Palette (1–3–5)'
                }
              }
            }
          ]
        },
        {
          id: 'p1-l2-reiteration-rhythm',
          code: 'P1.2',
          level: 'Foundation',
          title: 'Reiteration, Diminution & Augmentation',
          summary: 'Establish intent with exact repetition, then compress or stretch your motif’s rhythm.',
          why: () => 'In music, a single idea is an occurrence; repeated once, it signals deliberate intent; repeated twice, it becomes a theme. Compressing note values (diminution) injects sudden urgency, while stretching them (augmentation) creates lyrical weight—all without inventing new pitches.',
          listenFor: () => [
            'Did your repeated motif match the exact rhythm and articulation so it sounded intentional?',
            'When compressing quarter notes into eighths (diminution), did every note stay crisp and in-pocket?',
            'When stretching eighth notes into half notes (augmentation), did you hold steady time without rushing?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Exact Repeat → Compress → Stretch',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 76 BPM using degrees 1, 3, and 5 (${noteAt(k, 0)}, ${noteAt(k, 4)}, ${noteAt(k, 7)}). Cycle through 3 operations: (A) Play a 3-note motif in Bar 1, repeat it identically in Bar 2, rest 2 bars. (B) Play it in quarters in Bar 1, compress to eighths in Bar 2. (C) Play it in eighths in Bar 1, stretch into half notes across Bars 2–3.`,
              config: {
                progression: [c(0, 'maj', 'I', 2)],
                bpm: 76,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'palette',
                  semis: [0, 4, 7],
                  labels: { 0: '1', 4: '3', 7: '5' },
                  badge: '3-Note Motif Lab (1–3–5)'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Funk / Groove Compression',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${chordAt(k, 0, '7')} – ${chordAt(k, 5, '7')} pocket vamp, alternate between calm quarter-note motif statements and urgent compressed eighth-note answers using your 1–3–5 palette (${noteAt(k, 0)}, ${noteAt(k, 4)}, ${noteAt(k, 7)}), then stretch a phrase into warm half-note declarations.`,
              config: {
                progression: [c(0, '7', 'I7', 2), c(5, '7', 'IV7', 2)],
                bpm: 82,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'palette',
                  semis: [0, 4, 7],
                  labels: { 0: '1', 4: '3', 7: '5' },
                  badge: '3-Note Palette (1–3–5)'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: '12-Bar Blues Thematic Development',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over a 12-Bar Blues in ${k}, deploy Exact Reiteration on Bars 1, 5, and 9, then use rhythmic diminution to build energy toward the turnaround and augmentation to signal resolution.`,
              config: {
                progression: BLUES_12,
                bpm: 90,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p1-l3-inversion-expansion',
          code: 'P1.3',
          level: 'Intermediate',
          title: 'Melodic Inversion & Intervallic Expansion',
          summary: 'Mirror vertical contour up↔down and widen tight steps into dramatic vocal leaps.',
          why: (k) => `Listeners recognize a motif by its rhythm and shape. Flipping an ascending triad line (${noteAt(k, 0)}→${noteAt(k, 4)}→${noteAt(k, 7)}) upside down (${noteAt(k, 7)}→${noteAt(k, 4)}→${noteAt(k, 0)}) or stretching intervals into wider leaps (${noteAt(k, 0)}→${noteAt(k, 7)}→high ${noteAt(k, 0)}) creates instant variety while keeping your solo cohesive.`,
          listenFor: () => [
            'Did your inverted phrases keep the exact rhythmic DNA of the original motif?',
            'When expanding intervals into wider leaps, did your phrasing sound expressive and vocal rather than random?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Mirror Contour Drill',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Play an ascending 3-note motif on 1–3–5 (${noteAt(k, 0)} → ${noteAt(k, 4)} → ${noteAt(k, 7)}) in Bar 1, then immediately mirror it descending (${noteAt(k, 7)} → ${noteAt(k, 4)} → ${noteAt(k, 0)}) with the same rhythm in Bar 2. Next, keep the rhythm and widen the leaps (${noteAt(k, 0)} → ${noteAt(k, 7)} → High ${noteAt(k, 0)}).`,
              config: {
                progression: [c(0, 'maj', 'I', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'majorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Ascending Call / Inverted Response',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over the ${chordAt(k, 0, 'maj7')} – ${chordAt(k, 5, 'maj7')} loop, state an ascending motif on ${chordAt(k, 0, 'maj7')} and answer with its downward mirror image on ${chordAt(k, 5, 'maj7')}. On every second cycle, expand one interval into a wider leap.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(5, 'maj7', 'IVmaj7', 2)],
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: '4-Chord Melodic Evolution',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo over ${chordAt(k, 0, '')} – ${chordAt(k, 9, 'm')} – ${chordAt(k, 5, '')} – ${chordAt(k, 7, '')}, enforcing melodic inversion on every second phrase and using one wide intervallic expansion per chorus as a melodic high point.`,
              config: {
                progression: POP_4_LOOP,
                bpm: 94,
                chordTimbre: 'piano',
                compStyle: 'arpeggio',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'major',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p1-l4-rule-of-three',
          code: 'P1.4',
          level: 'Intermediate',
          title: 'The Universal Rule of Three',
          summary: 'Structure phrases in 3 parts: Statement → Variation → Departure & Cadential Resolution.',
          why: () => 'Great melodies across jazz, blues, rock, and classical follow a 3-part narrative arc: introduce a clear hook (Bars 1–2), develop it once so the listener feels continuity (Bars 3–4), then break away into a flowing resolution that delivers emotional payoff (Bars 5–6).',
          listenFor: () => [
            'Did Part 1 leave 1–2 beats of space so the motif could register?',
            'Did Part 2 clearly sound like an organic variation of Part 1 (inversion, displacement, or expansion)?',
            'Did Part 3 break free into a linear run that resolved cleanly onto a target chord tone?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '6-Bar Rule of Three Formula',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Count 6-bar cycles strictly in ${k}: Bars 1–2 = Short 3-note Statement + space; Bars 3–4 = Variation (invert or rhythmically displace it); Bars 5–6 = Longer departure run resolving firmly onto ${noteAt(k, 0)} (Root) or ${noteAt(k, 4)} (3rd).`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: '5 Unbroken Cycles Over Static Vamp',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this relaxed ${chordAt(k, 0, 'maj7')} groove, execute 5 unbroken cycles of Statement → Variation → Departure without letting your phrases blur together.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2), c(5, 'maj7', 'IVmaj7', 2)],
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'major',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Full Progression Rule of Three',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo over the ${k} progression enforcing the Rule of Three across each phrase cycle (Statement on chord 1, Variation on chord 2, Departure & Resolution across chords 3–4).`,
              config: {
                progression: POP_AXIS,
                bpm: 96,
                chordTimbre: 'piano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'rock',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 2: METRIC FREEDOM & PHRASE LAUNCHPADS
       ========================================================================= */
    {
      id: 'metric-freedom',
      number: 2,
      icon: '⏱️',
      title: 'Metric Freedom & Launchpads',
      tagline: 'Cure "Downbeat Disease" by mastering all 8 eighth-note launch slots.',
      philosophy: 'Predictable solos almost always suffer from rhythmic monotony rather than bad note choices. In 4/4 time there are eight eighth-note launchpads—learning to enter off Beat 1 and control where your phrases end transforms even simple notes into compelling grooves.',
      lessons: [
        {
          id: 'p2-l1-beat-one-ban',
          code: 'P2.1',
          level: 'Foundation',
          title: 'The Beat 1 Ban & Beat 2 Entry',
          summary: 'Forbid starting on Beat 1 so every phrase launches cleanly on Beat 2 ("The Conversationalist").',
          why: () => 'Starting every phrase squarely on Beat 1 ("Downbeat Disease") feels heavy and plodding. Giving Beat 1 to the rhythm section and entering on Beat 2 creates an effortless, conversational pocket.',
          listenFor: () => [
            'Did you resist flinching onto Beat 1 across the entire track?',
            'Did your Beat 2 entrances feel relaxed, confident, and locked to the snare/backbeat?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Zero Notes on Beat 1 (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 80 BPM. Count "1" silently or tap your foot on Beat 1—playing on Beat 1 is strictly forbidden! Launch every 2-bar phrase squarely on Beat 2 (highlighted in green on the beat strip).',
              beatCue: { mode: 'quarter', banned: [0], targets: [2], label: 'BAN Beat 1 (red) • LAUNCH on Beat 2 (green)' },
              config: {
                progression: [c(0, '7', 'I7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Groove Beat 2 Pocket',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${chordAt(k, 0, 'm7')} – ${chordAt(k, 5, '7')} groove, let the bass and kick own Beat 1, then speak on Beat 2. Notice how much wider the pocket immediately feels.`,
              beatCue: { mode: 'quarter', banned: [0], targets: [2], label: 'Let Beat 1 breathe • Enter on Beat 2' },
              config: {
                progression: DORIAN_FUNK,
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Full Blues With Beat 1 Banned',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely across a 12-Bar Blues in ${k} with ONE unbreakable rule: no phrase may start on Beat 1 of any bar. Enter on Beat 2 (or later) every time.`,
              beatCue: { mode: 'quarter', banned: [0], targets: [2], label: 'Rule: Never start a phrase on Beat 1' },
              config: {
                progression: BLUES_12,
                bpm: 92,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p2-l2-and-of-two',
          code: 'P2.2',
          level: 'Intermediate',
          title: 'Syncopated Upbeats (& of 2 Launchpad)',
          summary: 'Subdivide eighth notes and launch buoyant, funky motifs strictly on the "& of 2".',
          why: () => 'The "& of 2" is off-kilter, funky, and propels the listener toward the center of the bar. Drilling an eighth-note click trains your internal subdivision so upbeat entries feel crisp instead of rushed or dragged into Beat 3.',
          listenFor: () => [
            'Did your phrase launch cleanly ON the "& of 2" without slipping late onto Beat 3?',
            'Did the syncopation feel light and buoyant against the steady groove?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '8th-Note Subdivision Click',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Eighth-note metronome at 80 BPM. Count "1-&, 2-&" aloud and launch concise 3–4 note motifs exclusively on the "& of 2" (green slot). Rest 2 bars between attempts.',
              beatCue: { mode: 'eighth', banned: [0], targets: [3], label: 'Subdivide 1-& 2-& • LAUNCH on & of 2' },
              config: {
                progression: [c(0, '7', 'I7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome_8th',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Funk / Soul Pocket Syncopation',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} funk groove, launch punchy motifs on the "& of 2", pushing into Beat 3 and leaving open air across the barline.`,
              beatCue: { mode: 'eighth', targets: [3], label: 'Target Launchpad: & of 2' },
              config: {
                progression: [c(0, 'm7', 'im7'), c(5, '7', 'IV7'), c(0, 'm9', 'im9'), c(5, '9', 'IV9')],
                bpm: 92,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Swing / Pop Loop + Rule of Three',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over this ${k} loop using the "& of 2" as your primary springboard, combining it with the Rule of Three (Statement → Variation → Departure).`,
              beatCue: { mode: 'eighth', targets: [3], label: 'Primary Springboard: & of 2' },
              config: {
                progression: POP_AXIS,
                bpm: 98,
                chordTimbre: 'piano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'rock',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p2-l3-and-of-four-pickup',
          code: 'P2.3',
          level: 'Intermediate',
          title: 'Cross-Barline Pickup (& of 4) & Alternating Slots',
          summary: 'Use the "& of 4" pickup to propel lines smoothly across chord changes, then alternate with Beat 2.',
          why: () => 'The "& of 4" is the defining pickup of jazz, blues, and bebop phrasing—it bridges across the barline so your melody anticipates the incoming chord instead of stopping dead before every bar change.',
          listenFor: () => [
            'Did your "& of 4" pickup glide smoothly across the barline right onto a chord tone on Beat 1?',
            'When alternating Phrase 1 on "& of 4" and Phrase 2 on Beat 2, did the solo immediately feel more alive and unpredictable?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Pickup Across the Barline',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Eighth-note metronome at 84 BPM. Start a short pickup on the "& of 4" (green slot) that leaps across the barline onto Beat 1 of the next bar. After 5 minutes, alternate: Phrase 1 starts on "& of 4", Phrase 2 starts on Beat 2.',
              beatCue: { mode: 'eighth', targets: [7, 2], label: 'Pickup on & of 4 (barline bridge) • Alternate with Beat 2' },
              config: {
                progression: [c(2, 'm7', 'iim7', 2), c(7, '7', 'V7', 2)],
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome_8th',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Anticipating Every Chord Change',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over ${chordAt(k, 2, 'm7')} → ${chordAt(k, 7, '7')} in ${k}, launch a pickup on the "& of 4" of bar 2 so you land squarely on the dashed Ghost guide tone of the new chord on Beat 1.`,
              beatCue: { mode: 'eighth', targets: [7], label: 'Launch pickup on & of 4 → land on new chord tone' },
              config: {
                progression: [c(2, 'm7', 'iim7', 2), c(7, '7', 'V7', 2)],
                bpm: 88,
                chordTimbre: 'epiano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Alternating Launchpads Over Full Turnaround',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over the ${k} Jazz ii–V–I–VI turnaround, alternating phrase launches between the "& of 4" pickup and relaxed Beat 2 entries.`,
              beatCue: { mode: 'eighth', targets: [7, 2], label: 'Alternate Phrase Launches: & of 4 ↔ Beat 2' },
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 102,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p2-l4-cadence-endings',
          code: 'P2.4',
          level: 'Intermediate',
          title: 'Strong-Beat vs. Weak-Beat Phrase Endings',
          summary: 'Control emotional closure by ending on strong beats (1 / 3) vs. weak beats / upbeats (& of 2 / 3 / 4).',
          why: () => 'Where you STOP a phrase matters as much as where you start it. Strong-beat endings (Beat 1 or 3) deliver decisive finality, while weak-beat endings (& of 2, & of 3, or & of 4) leave ideas suspended in mid-air with forward narrative tension.',
          listenFor: () => [
            'Did strong-beat endings (Beat 1 or 3) feel grounded and conclusive?',
            'Did weak-beat endings (& of 2, 3, or 4) create floating suspense that pulled the ear toward your next phrase?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Strong-Beat vs. Weak-Beat Stops',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Eighth-note metronome at 84 BPM. First 5 min: start on off-beats and STOP decisively on Beat 1 or Beat 3 (strong-beat endings). Next 5 min: STOP every phrase on the "& of 2", "& of 3", or "& of 4" (weak-beat endings) and hold it suspended.',
              beatCue: { mode: 'eighth', targets: [0, 4, 3, 5, 7], label: 'Contrast endings: Strong Beat (1, 3) vs. Weak Beat (& of 2, 3, 4)' },
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2)],
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome_8th',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'major',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Bossa Weak-Beat Endings',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} Bossa Nova groove, end three phrases in a row on weak-beat cadences (& of 2, 3, or 4), then deliver one grounded strong-beat cadence on Beat 1 to release all the built-up suspense.`,
              beatCue: { mode: 'eighth', targets: [3, 5, 7], label: 'Suspend phrases on & of 2, 3, or 4 → resolve on Beat 1' },
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(2, 'm7', 'iim7'), c(7, '7', 'V7')],
                bpm: 92,
                chordTimbre: 'epiano',
                compStyle: 'bossa',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'major',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'All 8 Launchpads + Dynamic Cadences',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over ${k} changes, mixing varied off-beat launchpads with alternating suspended (upbeat) and conclusive (Beat 1/3) endings to punctuate section turnarounds.`,
              beatCue: { mode: 'eighth', targets: [0, 4], label: 'Mix upbeat suspense with Beat 1 / 3 punctuation' },
              config: {
                progression: POP_4_LOOP,
                bpm: 96,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 3: CALL & RESPONSE ARCHITECTURE
       ========================================================================= */
    {
      id: 'call-response',
      number: 3,
      icon: '💬',
      title: 'Call & Response Architecture',
      tagline: 'Phrase like human dialogue: open ascending questions met by grounded answers.',
      philosophy: 'Memorable improvisation breathes like a conversation. Dividing phrases into an ascending, tension-ending Call (Antecedent) followed by silence and a descending, resolved Response (Consequent) immediately eliminates aimless wandering.',
      lessons: [
        {
          id: 'p3-l1-symmetrical-qa',
          code: 'P3.1',
          level: 'Foundation',
          title: 'Symmetrical 2-Bar Question & 2-Bar Answer',
          summary: 'Ask an ascending 2-bar Question ending on active tension; answer with a descending 2-bar resolution.',
          why: (k) => `Human speech rises in pitch at the end of a question and drops at the end of a statement. Ending a Call on an active tension (${noteAt(k, 2)} [2nd], ${noteAt(k, 5)} [4th], or ${noteAt(k, 10)}/${noteAt(k, 11)} [7th]) creates curiosity that makes your descending Answer onto ${noteAt(k, 0)} (R) or ${noteAt(k, 4)} (3rd) feel deeply satisfying.`,
          listenFor: () => [
            'Did your Question genuinely leave harmonic tension hanging in the air?',
            'Did your Answer echo the rhythm of the Question while resolving cleanly to Root, 3rd, or 5th?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '2-Bar Call / 2-Bar Response',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Bars 1–2 (Call): Play an ascending phrase ending on ${noteAt(k, 2)} (2nd) or ${noteAt(k, 5)} (4th) and rest 2 beats. Bars 3–4 (Response): Echo the rhythm descending down to ${noteAt(k, 0)} (Root) or ${noteAt(k, 4)} (3rd).`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'major',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: '6 Continuous Q&A Pairs',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this static ${chordAt(k, 0, 'maj7')} vamp, execute 6 continuous Question-and-Answer pairs. Keep the rhythmic DNA consistent between each Call and its Answer.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'major',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: '2-Chord Conversational Loop',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over ${chordAt(k, 0, 'maj7')} (2 bars = Call) → ${chordAt(k, 5, 'maj7')} (2 bars = Response), letting every 4-bar span read clearly as a complete musical sentence.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(5, 'maj7', 'IVmaj7', 2)],
                bpm: 88,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p3-l2-blues-dialogue',
          code: 'P3.2',
          level: 'Foundation',
          title: '12-Bar Blues Conversational Grid',
          summary: 'Map three distinct Call/Response pairs across a 12-Bar Blues chorus.',
          why: () => 'The 12-bar blues is natively built on three 4-bar conversational pairs: Statement (Bars 1–4), Answer over IV (Bars 5–8), and Turnaround Resolution (Bars 9–12). Treating your instrument like two vocalists trading lines turns a blues solo into storytelling.',
          listenFor: () => [
            'Did each 2-bar unit clearly act as either a Question or an Answer?',
            'Did you leave breathing room between Bars 2→3, 6→7, and 10→11 instead of playing wall-to-wall?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Map the 3 Blues Dialogue Pairs',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 80 BPM. Rehearse the 12-bar blueprint: Bars 1–2 (Call) → Bars 3–4 (Response); Bars 5–6 (Call over IV) → Bars 7–8 (Response over I); Bars 9–10 (Call over V→IV) → Bars 11–12 (Resolution).',
              config: {
                progression: BLUES_12,
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'shuffle',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Blues Strict Dialogue',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this slow 12-Bar Blues in ${k}, stick strictly to the 2-bar Call / 2-bar Response grid. Imagine two singers trading lines across a quiet room.`,
              config: {
                progression: BLUES_12,
                bpm: 76,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Medium Blues Conversational Soloing',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the full ${k} 12-Bar Blues at medium tempo while keeping all three Q&A pairs unmistakable across every chorus.`,
              config: {
                progression: BLUES_12,
                bpm: 96,
                chordTimbre: 'blues_drive',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p3-l3-contrast-textures',
          code: 'P3.3',
          level: 'Intermediate',
          title: 'Conversational Textures (Register, Dynamics & Articulation)',
          summary: 'Make Call & Response unmistakable by contrasting low/high octaves, pp/ff volume, and staccato/legato touch.',
          why: () => 'Even with great notes, uniform volume and register flatten a solo. Pairing a dark low-register or staccato whisper Call with a bright high-register or singing legato Answer creates instant theatrical depth.',
          listenFor: () => [
            'Did octave leaps between low Calls and high Responses land cleanly without hesitation?',
            'Did your whisper-quiet (pp) phrases maintain clear pitch and solid time?',
            'Did contrasting staccato vs. legato make it sound like two distinct voices speaking?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '3 Contrast Drills (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 78 BPM. Spend ~3 minutes on each contrast pair (2 bars each): (1) Low-register Call → High-register Response; (2) Whisper-quiet (pp) Call → Bold (ff) Response; (3) Crisp staccato Call → Smooth singing legato Response.',
              config: {
                progression: [c(0, 'm7', 'im7', 2), c(0, 'm7', 'im7', 2)],
                bpm: 78,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Minor Groove Extremes',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this slow ${chordAt(k, 0, 'm7')} – ${chordAt(k, 5, 'm7')} groove, trade dark, hushed low-register staccato Calls with soaring, assertive high-register legato Answers.`,
              config: {
                progression: [c(0, 'm7', 'im7', 2), c(5, 'm7', 'ivm7', 2)],
                bpm: 80,
                chordTimbre: 'epiano',
                compStyle: 'sustained',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Minor Blues Theatrical Dialogue',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo over a Minor Blues in ${k}, weaving register shifts, extreme dynamic swells, and staccato/legato contrast into your phrases.`,
              config: {
                presetName: '12-Bar Minor Blues',
                bpm: 88,
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p3-l4-asymmetrical',
          code: 'P3.4',
          level: 'Advanced',
          title: 'Asymmetrical Phrasing (1-Bar Call / 3-Bar Answer)',
          summary: 'Break predictable 2+2 symmetry with punchy short calls answered by expansive rolling resolutions.',
          why: () => 'Real dialogue is rarely symmetrical. A punchy 1-bar question followed by a bar of silence and an expansive 3-bar flowing answer surprises the listener and trains you to sustain melodic direction across longer spans.',
          listenFor: () => [
            'Did the 1-bar Call feel concise and provocative rather than clipped?',
            'Did your 3-bar Answer maintain clear melodic direction all the way to its target landing note?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '1-Bar Call + 1-Bar Rest + 3-Bar Answer',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 80 BPM. Play a punchy 1-bar Question, leave 1 full bar of silence, then deliver a smooth, rolling 3-bar cadential Answer. Repeat and also try the reverse (3-bar build → 1-bar crisp answer).',
              config: {
                progression: [c(0, 'm7', 'im7', 2), c(5, '7', 'IV7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Neo-Soul Unequal Phrase Lengths',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} Neo-Soul groove, trigger long, winding 3-bar resolutions from brief 1-bar rhythmic questions.`,
              config: {
                presetName: 'Neo-Soul / R&B Royal Road',
                bpm: 86,
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Alternating Short/Long & Long/Short',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${k} Jazz turnaround, deliberately alternating short/long (1+3) and long/short (3+1) conversational pairings.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 98,
                chordTimbre: 'epiano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 4: GUIDE TONES & VOICE LEADING
       ========================================================================= */
    {
      id: 'guide-tones',
      number: 4,
      icon: '🎯',
      title: 'Guide Tones & Voice Leading',
      tagline: 'Connect 3rds, 7ths, and expressive 6ths by step so your lines outline every chord.',
      philosophy: 'Roots and 5ths supply acoustic stability, but 3rds (major vs. minor quality) and 7ths (harmonic pull) carry the entire emotional identity of a chord. Connecting guide tones by half-step—and flavoring lines with the major 6th—makes your solo sound unmistakably anchored to the harmony.',
      lessons: [
        {
          id: 'p4-l1-isolating-thirds',
          code: 'P4.1',
          level: 'Foundation',
          title: 'Isolating 3rds & Approach Bridges (I → IV)',
          summary: 'Lock onto the green 3rd on Beat 1 of each chord shift, then build scalar bridges into it.',
          why: (k) => `Over ${chordAt(k, 0, '')} → ${chordAt(k, 5, '')}, hitting ${noteAt(k, 4)} (3rd of ${chordAt(k, 0, '')}) and ${noteAt(k, 9)} (3rd of ${chordAt(k, 5, '')}) immediately announces the harmony to any listener—even without a backing band.`,
          listenFor: (k) => [
            `Did you land cleanly on ${noteAt(k, 4)} over ${chordAt(k, 0, '')} and ${noteAt(k, 9)} over ${chordAt(k, 5, '')} right on the downbeat?`,
            'Did your scalar approach lines feel purposeful, leading the ear directly into each incoming 3rd?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '3rds Only on Beat 1',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 75 BPM. Identify the two green 3rds: ${noteAt(k, 4)} (for ${chordAt(k, 0, '')}) and ${noteAt(k, 9)} (for ${chordAt(k, 5, '')}). Play ONLY those two notes as whole notes on Beat 1 as the visualizer switches.`,
              config: {
                progression: [c(0, 'maj', 'I', 2), c(5, 'maj', 'IV', 2)],
                bpm: 75,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Sustained 3rds + 3-Note Scalar Bridges',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over ${chordAt(k, 0, '')} – ${chordAt(k, 5, '')}, first play sustained whole-note 3rds (${noteAt(k, 4)} → ${noteAt(k, 9)}). Then launch short 3-note scalar runs from Beat 3 or "& of 4" that land squarely on the next chord's dashed ghost 3rd on Beat 1.`,
              config: {
                progression: [c(0, 'maj', 'I', 2), c(5, 'maj', 'IV', 2)],
                bpm: 80,
                chordTimbre: 'epiano',
                compStyle: 'sustained',
                bassMode: 'root',
                drumGroove: 'halftime',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'major',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: '4-Chord Pop Loop 3rd Targeting',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over ${chordAt(k, 0, '')} – ${chordAt(k, 9, 'm')} – ${chordAt(k, 5, '')} – ${chordAt(k, 7, '')}. Aim to land on the green 3rd (${noteAt(k, 4)} → ${noteAt(k, 0)} → ${noteAt(k, 9)} → ${noteAt(k, 11)}) on every chord shift using connecting scale steps.`,
              config: {
                progression: POP_4_LOOP,
                bpm: 88,
                chordTimbre: 'piano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'rock',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'major',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p4-l2-ii-v-i-guide-tones',
          code: 'P4.2',
          level: 'Foundation',
          title: 'Stepwise Guide-Tone Lines (ii7 → V7 → Imaj7)',
          summary: 'Master the half-step 7th→3rd voice-leading cascade and common-tone pivot across ii–V–I.',
          why: (k) => `In ${k}, the 7th of ${chordAt(k, 2, 'm7')} (${noteAt(k, 0)}) steps down one half-step to become the 3rd of ${chordAt(k, 7, '7')} (${noteAt(k, 11)}), while the 7th of ${chordAt(k, 7, '7')} (${noteAt(k, 5)}) steps down one half-step to become the 3rd of ${chordAt(k, 0, 'maj7')} (${noteAt(k, 4)}). Meanwhile, ${noteAt(k, 5)} holds as a common tone between ${chordAt(k, 2, 'm7')} and ${chordAt(k, 7, '7')}!`,
          listenFor: (k) => [
            `Did the half-step drop from ${noteAt(k, 0)} → ${noteAt(k, 11)} and ${noteAt(k, 5)} → ${noteAt(k, 4)} sound effortless and transparent?`,
            'Could you hear the chord progression clearly even when playing only 1–2 notes per measure?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'ii–V Half-Step Cascade (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 78 BPM over ${chordAt(k, 2, 'm7')} → ${chordAt(k, 7, '7')}. Practice sustaining ${noteAt(k, 0)} (blue ♭7) and dropping 1 semitone to ${noteAt(k, 11)} (green 3rd). Notice the yellow dashed common-tone halo on ${noteAt(k, 5)}!`,
              config: {
                progression: [c(2, 'm7', 'iim7', 2), c(7, '7', 'V7', 2)],
                bpm: 78,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Full ii–V–I Falling Guide Lines',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over ${chordAt(k, 2, 'm7')} → ${chordAt(k, 7, '7')} → ${chordAt(k, 0, 'maj7')}, play Path A: ${noteAt(k, 0)} → ${noteAt(k, 11)} → ${noteAt(k, 11)} (or ${noteAt(k, 4)}). Then play Path B (Common-Tone Pivot): ${noteAt(k, 5)} (3rd of ii) → ${noteAt(k, 5)} (♭7 of V) → ${noteAt(k, 4)} (3rd of I).`,
              config: {
                progression: [c(2, 'm7', 'iim7', 2), c(7, '7', 'V7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 82,
                chordTimbre: 'epiano',
                compStyle: 'sustained',
                bassMode: 'two_feel',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Jazz ii–V–I–VI Anchored Soloing',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise continuous lines across the ${k} ii–V–I–VI turnaround, weaving around the falling green 3rds and blue 7ths without reverting to mechanical arpeggios.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 100,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p4-l3-blues-tritone-swap',
          code: 'P4.3',
          level: 'Intermediate',
          title: 'The 12-Bar Blues Tritone Swap (I7 ↔ IV7)',
          summary: 'Voice-lead the signature blues shift where the 3rd and ♭7 swap places by a half-step.',
          why: (k) => `In a ${k} blues, moving from ${chordAt(k, 0, '7')} to ${chordAt(k, 5, '7')} is pure voice-leading magic: ${noteAt(k, 4)} (3rd of ${chordAt(k, 0, '7')}) drops one half-step to ${noteAt(k, 3)} (♭7 of ${chordAt(k, 5, '7')}), while ${noteAt(k, 10)} (♭7 of ${chordAt(k, 0, '7')}) drops one half-step to ${noteAt(k, 9)} (3rd of ${chordAt(k, 5, '7')}).`,
          listenFor: (k) => [
            `Did your line clearly announce the arrival of ${chordAt(k, 5, '7')} at Bar 5 using the ${noteAt(k, 4)}→${noteAt(k, 3)} or ${noteAt(k, 10)}→${noteAt(k, 9)} half-step drop?`,
            'Did you reverse the half-step back smoothly when returning to I7 at Bar 7?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '2-Chord Tritone Swap (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 78 BPM. Over ${chordAt(k, 0, '7')} ↔ ${chordAt(k, 5, '7')}, drill both half-step voice-leading lines: ${noteAt(k, 4)} ↔ ${noteAt(k, 3)} and ${noteAt(k, 10)} ↔ ${noteAt(k, 9)}.`,
              config: {
                progression: [c(0, '7', 'I7', 2), c(5, '7', 'IV7', 2)],
                bpm: 78,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Blues Bar 4→5 & 6→7 Swaps',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this slow ${k} blues, concentrate on Bar 4→5 (${noteAt(k, 4)} → ${noteAt(k, 3)}) and Bar 6→7 (${noteAt(k, 3)} → ${noteAt(k, 4)}) plus the turnaround V7→IV7→I7.`,
              config: {
                progression: BLUES_12,
                bpm: 80,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Blues Scale + Guide-Tone Swaps',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise across the full ${k} 12-Bar Blues blending violet Blues Scale phrasing with unmistakable 3rd↔♭7 voice leading at every chord change.`,
              config: {
                progression: BLUES_12,
                bpm: 96,
                chordTimbre: 'blues_drive',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p4-l4-rock-mixolydian-paths',
          code: 'P4.4',
          level: 'Intermediate',
          title: 'Rock / Mixolydian Linear Paths (I → ♭VII → IV)',
          summary: 'Master two classic linear hooks across I – ♭VII – IV: Falling 3rds and the Flat-7th Slide.',
          why: (k) => `Classic rock progressions (${chordAt(k, 0, '')} → ${chordAt(k, 10, '')} → ${chordAt(k, 5, '')}) have built-in vocal voice-leading highways: Path 1 (Falling 3rds: ${noteAt(k, 4)} → ${noteAt(k, 2)} → ${noteAt(k, 0)}/${noteAt(k, 9)}) and Path 2 (Flat-7th Slide: ${noteAt(k, 0)} → ${noteAt(k, 10)} → ${noteAt(k, 9)}).`,
          listenFor: () => [
            'Did your voice-leading line cut cleanly through the rock groove and outline each chord shift?',
            'Did you avoid defaulting to generic minor pentatonic box patterns when the ♭VII and IV chords arrived?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Path 1 & Path 2 Linear Drill',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 84 BPM over ${chordAt(k, 0, '')} → ${chordAt(k, 10, '')} → ${chordAt(k, 5, '')}. Practice Path 1 (Falling 3rds: ${noteAt(k, 4)} → ${noteAt(k, 2)} → ${noteAt(k, 9)}) and Path 2 (Flat-7th Slide: ${noteAt(k, 0)} → ${noteAt(k, 10)} → ${noteAt(k, 9)}).`,
              config: {
                progression: ROCK_MIXOLYDIAN,
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'quarters',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'mixolydian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Whole-Note Vocal Hooks Over Rock Groove',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over the ${k} rock track, first sustain Path 1 (${noteAt(k, 4)} → ${noteAt(k, 2)} → ${noteAt(k, 9)} → ${noteAt(k, 4)}) as whole notes, then Path 2 (${noteAt(k, 0)} → ${noteAt(k, 10)} → ${noteAt(k, 9)} → ${noteAt(k, 0)}). Hear how instantly iconic both lines sound!`,
              config: {
                progression: ROCK_MIXOLYDIAN,
                bpm: 104,
                chordTimbre: 'rock_plexi',
                compStyle: 'folk_strum',
                bassMode: 'eighth',
                drumGroove: 'rock',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'mixolydian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Full Mixolydian Rock Lead Flow',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over ${chordAt(k, 0, '')} – ${chordAt(k, 10, '')} – ${chordAt(k, 5, '')} – ${chordAt(k, 0, '')}, weaving between Path 1 and Path 2 with driving rock attitude and Mixolydian passing tones.`,
              config: {
                progression: ROCK_MIXOLYDIAN,
                bpm: 118,
                chordTimbre: 'rock_plexi',
                compStyle: 'folk_strum',
                bassMode: 'eighth',
                drumGroove: 'rock',
                voicingMode: 'power',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'mixolydian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p4-l5-expressive-sixths',
          code: 'P4.5',
          level: 'Advanced',
          title: 'Expressive 6ths & Color Tones',
          summary: 'Soften root resolutions with the Major 6th, hit the Dominant "sweet note", and lift minor chords with the Dorian 6th.',
          why: (k) => `Resolving bluntly to the Root sounds like a heavy period. Landing on the pink Major 6th (${noteAt(k, 9)} over ${chordAt(k, 0, '')}) creates a buoyant, vocal resting pad—and in I→IV (${chordAt(k, 0, '')}→${chordAt(k, 5, '')}), that exact 6th (${noteAt(k, 9)}) pivots effortlessly into the Major 3rd of ${chordAt(k, 5, '')}!`,
          listenFor: () => [
            'Did resolving major phrases onto the pink 6th create a warm, floating feel compared to the Root?',
            'Over minor chords, did landing on the natural 6th and resolving down to the 5th create unmistakable Dorian lift?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Resolve to the Pink 6th (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Over ${chordAt(k, 0, 'maj7')}, practice ending every phrase on the pink Major 6th (${noteAt(k, 9)}) instead of the Root (${noteAt(k, 0)}). Feel how relaxed and open it sounds.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(5, 'maj7', 'IVmaj7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'major',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Expressive 6th Target'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Bossa Major 6th & I→IV Pivot',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} Bossa groove (${chordAt(k, 0, 'maj7')} → ${chordAt(k, 5, 'maj7')}), end phrases on ${noteAt(k, 9)} (pink 6th of ${chordAt(k, 0, 'maj7')}) and hold it right across the barline as it transforms into the green 3rd of ${chordAt(k, 5, 'maj7')}!`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2), c(5, 'maj7', 'IVmaj7', 2)],
                bpm: 88,
                chordTimbre: 'epiano',
                compStyle: 'bossa',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Major 6th Pivot'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Dorian Minor 6th Climax',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over ${chordAt(k, 0, 'm7')} – ${chordAt(k, 5, '7')}, use the pink natural 6th (${noteAt(k, 9)} over ${chordAt(k, 0, 'm7')}) as the emotional climax of your phrases, resolving smoothly down to the 5th (${noteAt(k, 7)}).`,
              config: {
                progression: DORIAN_FUNK,
                bpm: 94,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Dorian Natural 6th'
                }
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 5: CHROMATIC APPROACHES & ENCLOSURES
       ========================================================================= */
    {
      id: 'chromatic-approaches',
      number: 5,
      icon: '🧲',
      title: 'Chromatic Approaches & Enclosures',
      tagline: 'Frame target chord tones with vocal tension from below and above.',
      philosophy: 'Hitting chord tones bluntly can sound stiff. Wrapping your target roots, 3rds, and 5ths with half-step slides, 3-note bebop enclosures, and double chromatic pickups injects magnetic tension that snaps cleanly into the harmony.',
      lessons: [
        {
          id: 'p5-l1-half-step-slide',
          code: 'P5.1',
          level: 'Foundation',
          title: 'Chromatic Half-Step Slides from Below',
          summary: 'Slide into every target 3rd and 5th from one semitone below on the upbeat.',
          why: (k) => `Sliding from one half-step below on an upbeat (e.g., ${noteAt(k, 3)} → ${noteAt(k, 4)} on Beat 1 in ${k}) adds instant vocal grease and blues/jazz character without losing harmonic clarity.`,
          listenFor: () => [
            'Did the chromatic approach note land crisply on the upbeat so the chord tone arrived squarely ON the beat?',
            'Did every chromatic tension note resolve immediately by half-step without lingering?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Upbeat Half-Step Slide Into 3rds & 5ths',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Watch the rose "↗" markers one semitone below every green 3rd and indigo 5th (${noteAt(k, 3)}→${noteAt(k, 4)}, ${noteAt(k, 6)}→${noteAt(k, 7)} in ${k}). Play the rose note on the "&" upbeat and resolve on the beat.`,
              beatCue: { mode: 'eighth', targets: [7, 0], label: 'Chromatic slide on "&" → Target chord tone on the beat' },
              config: {
                progression: [c(0, '7', 'I7', 2), c(5, '7', 'IV7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome_8th',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'below',
                  targetRoles: ['third', 'fifth'],
                  badge: 'Half-Step Below (↗)'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Blues Upbeat Slides Into Every 3rd',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this slow ${k} blues, decorate every chord change by sliding from the rose "↗" half-step below on the "& of 4" directly into the incoming green 3rd on Beat 1.`,
              config: {
                progression: BLUES_12,
                bpm: 80,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'below',
                  targetRoles: ['third'],
                  badge: 'Half-Step Slide → 3rd (↗)'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Vocal Chromatic Slides in Full Blues',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${k} 12-Bar Blues integrating half-step slides into your lyrical motifs and Blues Scale phrases.`,
              config: {
                progression: BLUES_12,
                bpm: 94,
                chordTimbre: 'blues_drive',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'below',
                  targetRoles: ['third'],
                  badge: 'Half-Step Slide Hints (↗)'
                }
              }
            }
          ]
        },
        {
          id: 'p5-l2-enclosure-box',
          code: 'P5.2',
          level: 'Intermediate',
          title: 'The 3-Note Enclosure Box (Above → Below → Target)',
          summary: 'Surround target roots and 3rds from both directions: diatonic step above → chromatic half-step below → target.',
          why: (k) => `Encapsulating a target note from above and below—like ${noteAt(k, 5)} (above) → ${noteAt(k, 3)} (half-step below) → ${noteAt(k, 4)} (3rd of ${chordAt(k, 0, 'maj7')})—creates the classic bebop magnetic pull that locks your ear onto the harmony.`,
          listenFor: () => [
            'Did the 3-note enclosure flow as one smooth ornament rather than three stiff, separate notes?',
            'Did the final target note arrive cleanly on a strong metric landing zone (Beat 1 or Beat 3)?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Above (↘) → Below (↗) → Target',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Practice enclosing the Root (${noteAt(k, 2)} → ${noteAt(k, 11)} → ${noteAt(k, 0)}) and the 3rd (${noteAt(k, 5)} → ${noteAt(k, 3)} → ${noteAt(k, 4)}) using the rose "↘ / ↗" enclosure markers on the diagram.`,
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['root', 'third'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['root', 'third'],
                  badge: '3-Note Enclosure (↘ ↗)'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Enclose the Resolution of ii–V–I',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over ${chordAt(k, 2, 'm7')} → ${chordAt(k, 7, '7')} → ${chordAt(k, 0, 'maj7')}, enclose the 3rd of ${chordAt(k, 0, 'maj7')} (${noteAt(k, 5)} → ${noteAt(k, 3)} → ${noteAt(k, 4)}) right onto Beat 1 of resolution.`,
              config: {
                progression: [c(2, 'm7', 'iim7', 2), c(7, '7', 'V7', 2), c(0, 'maj7', 'Imaj7', 2)],
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['third'],
                  badge: 'Enclose Target 3rds (↘ ↗)'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Turnaround Soloing With Enclosures',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise over the ${k} Jazz ii–V–I–VI turnaround, dropping a fluid 3-note enclosure onto Beat 1 or Beat 3 whenever a new chord arrives.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 98,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['third'],
                  badge: '3-Note Enclosure Hints'
                }
              }
            }
          ]
        },
        {
          id: 'p5-l3-dominant-blues-enclosures',
          code: 'P5.3',
          level: 'Intermediate',
          title: 'Dominant & Blues Guide-Tone Enclosures',
          summary: 'Elevate blues and dominant V7 changes by enclosing the major 3rds of I7, IV7, and V7.',
          why: (k) => `Framing the major 3rd of dominant chords—like enclosing ${noteAt(k, 11)} on ${chordAt(k, 7, '7')} via ${noteAt(k, 0)} → ${noteAt(k, 10)} → ${noteAt(k, 11)}—blends raw blues grit with unmistakable modern jazz sophistication.`,
          listenFor: (k) => [
            `Did your enclosure resolve cleanly onto the major 3rd of ${chordAt(k, 0, '7')} (${noteAt(k, 4)}), ${chordAt(k, 5, '7')} (${noteAt(k, 9)}), and ${chordAt(k, 7, '7')} (${noteAt(k, 11)}) without hesitation?`,
            'Did blending pentatonic phrasing with enclosures at Bars 1, 5, and 9 feel cohesive?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Map Dominant 3rd Enclosures',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM. Map and repeat the 3 enclosures for a ${k} blues: I7 (${noteAt(k, 5)}→${noteAt(k, 3)}→${noteAt(k, 4)}), IV7 (${noteAt(k, 10)}→${noteAt(k, 8)}→${noteAt(k, 9)}), and V7 (${noteAt(k, 0)}→${noteAt(k, 10)}→${noteAt(k, 11)}).`,
              config: {
                progression: [c(0, '7', 'I7', 2), c(5, '7', 'IV7', 2), c(7, '7', 'V7', 2)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['third'],
                  badge: 'Dominant 3rd Enclosures'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Slow Blues Downbeat Enclosures',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over a slow 12-Bar Blues in ${k}, hit Bar 1 (I7), Bar 5 (IV7), Bar 7 (I7), and Bar 9 (V7) with a dedicated 3-note enclosure landing right on Beat 1.`,
              config: {
                progression: BLUES_12,
                bpm: 80,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['third'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['third'],
                  badge: 'Blues 3rd Enclosures (↘ ↗)'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Pentatonic + Guide-Tone Enclosures',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely across the ${k} 12-Bar Blues, mixing soulful Blues Scale lines with crisp 3-note enclosures at the major chord pivots.`,
              config: {
                progression: BLUES_12,
                bpm: 96,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'enclosure',
                  targetRoles: ['third'],
                  badge: '3rd Enclosure Markers'
                }
              }
            }
          ]
        },
        {
          id: 'p5-l4-double-chromatic',
          code: 'P5.4',
          level: 'Advanced',
          title: 'Double Chromatic Approaches from Below',
          summary: 'Launch linear runs with two consecutive half-steps climbing into roots, 3rds, and 5ths.',
          why: (k) => `Approaching a target tone from two semitones below—like ${noteAt(k, 2)} → ${noteAt(k, 3)} → ${noteAt(k, 4)} into the 3rd of ${chordAt(k, 0, '')}—creates irresistible rhythmic drive and forward momentum into strong beats.`,
          listenFor: () => [
            'Did both chromatic pickup notes stay even and crisp so the target tone landed squarely on the beat?',
            'Did you avoid smearing the groove when accelerating through the two chromatic passing notes?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Double Half-Step Pickup Drill',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 84 BPM. Follow the rose "» ↗" markers two semitones below every target 3rd and 5th (e.g., ${noteAt(k, 2)} → ${noteAt(k, 3)} → ${noteAt(k, 4)} and ${noteAt(k, 5)} → ${noteAt(k, 6)} → ${noteAt(k, 7)} in ${k}). Play them as crisp eighth-note pickups into Beat 1 or 3.`,
              beatCue: { mode: 'eighth', targets: [6, 7, 0], label: 'Double chromatic on 4-& → Target on Beat 1' },
              config: {
                progression: [c(0, '7', 'I7', 2)],
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome_8th',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'double-below',
                  targetRoles: ['third', 'fifth'],
                  badge: 'Double Chromatic (» ↗)'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Funk / Jazz Punchy Pickups',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} funk vamp, use double chromatic approaches to punch into the 5th and Root of each chord on strong beats.`,
              config: {
                progression: [c(0, 'm7', 'im7', 2), c(5, '7', 'IV7', 2)],
                bpm: 90,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'double-below',
                  targetRoles: ['root', 'fifth'],
                  badge: 'Double Chromatic → R & 5'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Full Chromatic Fluency Synthesis',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${k} Jazz turnaround mixing single slides, 3-note enclosures, and double chromatic climbs—making sure every chromatic note resolves cleanly by step.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 102,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'approach',
                  mode: 'double-below',
                  targetRoles: ['third'],
                  badge: 'Double Chromatic Hints'
                }
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 6: RHYTHMIC ELASTICITY & THE BREATHING LAW
       ========================================================================= */
    {
      id: 'rhythmic-elasticity',
      number: 6,
      icon: '🌊',
      title: 'Rhythmic Elasticity & Breathing',
      tagline: 'Master space, rhythmic acceleration/deceleration, and metric displacement.',
      philosophy: 'Endless streams of identical eighth notes suffocate even brilliant note choices. By enforcing the Mandatory Breath Rule (at least 2 beats of silence every 2 bars) and deliberately shifting rhythmic gears from whole notes to triplets and back, your playing gains vocal poise and momentum.',
      lessons: [
        {
          id: 'p6-l1-two-beat-silence',
          code: 'P6.1',
          level: 'Foundation',
          title: 'The Two-Beat Silence Law',
          summary: 'Enforce real breathing space: never play longer than 2 bars without at least 2 full beats of rest.',
          why: () => 'If you cannot sing your phrase in one breath, it is too long. Space gives the listener time to absorb your last idea and lets the rhythm section shine—turning busy playing into confident, mature music.',
          listenFor: () => [
            'Did you keep at least 2 full beats of complete silence inside every 2-bar span?',
            'Did your phrases feel calmer, stronger, and more vocal once you stopped filling every gap?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '2 Bars Play / 2 Beats Rest Cycles',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 84 BPM. Play for at most 1.5–2 bars, then strictly rest for at least 2 full beats. Repeat for 10 clean cycles—if you play through the rest, pause and reset.',
              beatCue: { mode: 'quarter', banned: [4, 6], targets: [0, 2], label: 'Play max 2 bars → Enforce 2 full beats of total silence' },
              config: {
                progression: [c(0, '7', 'I7', 2)],
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Zero-Tolerance Space Over Groove',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} groove, enforce the strict Two-Beat Silence Law: every single 2-bar span must contain at least 2 beats of total silence.`,
              config: {
                progression: DORIAN_FUNK,
                bpm: 88,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'walking',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Breathing Discipline Across Full Blues',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo across a full 12-Bar Blues in ${k} maintaining effortless breathing space and letting the backing band answer your phrases during every rest.`,
              config: {
                progression: BLUES_12,
                bpm: 94,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p6-l2-rhythmic-pyramid',
          code: 'P6.2',
          level: 'Intermediate',
          title: 'The Rhythmic Pyramid (Acceleration)',
          summary: 'Climb smoothly through subdivisions: Whole → Quarters → Eighths → Triplets → 2 Beats Silence.',
          why: () => 'Switching rhythmic gears deliberately—instead of getting stuck in constant eighth notes—lets you build natural tension and excitement without even needing to play louder or higher.',
          listenFor: () => [
            'Were the gear-shifts between quarters, eighths, and triplets seamless and locked to the beat?',
            'Did the sudden silence at the top of the pyramid feel dramatic and intentional?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '5-Bar Rhythmic Pyramid (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 75 BPM. Cycle the 5-bar pyramid: Bar 1 = Whole note; Bar 2 = Quarter notes; Bar 3 = Eighth notes; Bar 4 = Eighth-note triplets; Bar 5 = At least 2 full beats of silence.',
              beatCue: { mode: 'quarter', targets: [0, 2, 4, 6], label: 'Gear Shift: Whole → Quarters → Eighths → Triplets → Rest' },
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1)],
                bpm: 75,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'majorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: '4 Pyramid Cycles Over Changes',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this ${k} loop, execute 4 full cycles of the Rhythmic Pyramid (Whole → Quarters → Eighths → Triplets → Rest), feeling the steady acceleration across the chord changes.`,
              config: {
                progression: POP_4_LOOP,
                bpm: 82,
                chordTimbre: 'epiano',
                compStyle: 'charleston',
                bassMode: 'two_feel',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Organic Acceleration in Live Soloing',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Improvise freely over the ${k} Jazz turnaround, using rhythmic acceleration to build momentum into cadences and sustained notes to cool back down.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 94,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p6-l3-reverse-pyramid',
          code: 'P6.3',
          level: 'Advanced',
          title: 'The Reverse Pyramid (Deceleration)',
          summary: 'Open with an energetic burst (16ths/triplets), then gracefully decelerate into singing whole notes.',
          why: () => 'Most improvisers only know how to speed up. Starting with a crisp flourish and slowing down into warm, sustained lyricism flips listener expectations and shows total command of time.',
          listenFor: () => [
            'Did the opening fast flurry stay articulate and in-time without rushing ahead of the beat?',
            'Did the deceleration into eighths and whole notes feel smooth, lyrical, and unhurried?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '4-Bar Reverse Pyramid (Metronome)',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 72 BPM. Reverse the pyramid: Bar 1 = Crisp 16th-note flurry (or brisk triplets); Bar 2 = Triplets; Bar 3 = Flowing eighth notes; Bar 4 = Warm sustained whole note + breath.',
              config: {
                progression: [c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1), c(0, 'maj7', 'Imaj7', 1)],
                bpm: 72,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'major',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Ballad Energy Release → Lyricism',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this slow ${k} ballad progression, unleash an expressive rapid flourish in Bar 1, then smoothly settle into singing, sustained chord tones by Bar 4.`,
              config: {
                progression: POP_4_LOOP,
                bpm: 76,
                chordTimbre: 'epiano',
                compStyle: 'arpeggio',
                bassMode: 'two_feel',
                drumGroove: 'halftime',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'majorpentatonic',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Contrast Accelerating & Decelerating Phrases',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${k} Neo-Soul progression, alternating accelerating lines with sudden reverse-pyramid decelerations to keep the listener engaged.`,
              config: {
                presetName: 'Neo-Soul / R&B Royal Road',
                bpm: 86,
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'color-tensions',
                targetRoles: ['third', 'seventh', 'sixth', 'ninth'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p6-l4-metric-displacement',
          code: 'P6.4',
          level: 'Advanced',
          title: 'Metric Displacement Under Pressure',
          summary: 'Shift a single 4-note motif across every beat: Bar 1 on Beat 1, Bar 2 on Beat 2, Bar 3 on Beat 3, Bar 4 on Beat 4.',
          why: () => 'Keeping the exact same pitches while rotating the starting beat by one beat per bar completely shifts the motif’s rhythmic center of gravity—building rock-solid internal time and high-level syncopation.',
          listenFor: () => [
            'Did you stay firmly anchored to the pulse without losing track of where Beat 1 was?',
            'Did the motif stay clearly recognizable even as its rhythmic accents shifted?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '4-Beat Rotation Across 4 Bars',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 80 BPM. Pick a crisp 4-note motif. Play it starting on Beat 1 in Bar 1, Beat 2 in Bar 2, Beat 3 in Bar 3, and Beat 4 in Bar 4—never lose sight of the downbeat.',
              beatCue: { mode: 'quarter', targets: [0, 2, 4, 6], label: 'Rotate start slot each bar: Beat 1 → 2 → 3 → 4' },
              config: {
                progression: [c(0, 'm7', 'im7', 1), c(0, 'm7', 'im7', 1), c(0, 'm7', 'im7', 1), c(0, 'm7', 'im7', 1)],
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'minorpentatonic',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: '4-Beat Displacement Over Groove',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Execute the 4-bar beat-rotation over this ${k} Dorian groove without losing your place in the form.`,
              beatCue: { mode: 'quarter', targets: [0, 2, 4, 6], label: 'Keep form locked while displacing your motif' },
              config: {
                progression: DORIAN_FUNK,
                bpm: 88,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Live Quarter & Eighth-Note Displacement',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${k} turnaround, deliberately displacing your favorite motifs by a quarter note or eighth note to create sophisticated syncopation.`,
              config: {
                progression: JAZZ_II_V_I_VI,
                bpm: 100,
                chordTimbre: 'epiano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        }
      ]
    },

    /* =========================================================================
       PILLAR 7: HARMONIC VERSATILITY & MULTI-CHORUS SOLO ARC
       ========================================================================= */
    {
      id: 'harmonic-arc',
      number: 7,
      icon: '🏛️',
      title: 'Harmonic Versatility & Solo Arc',
      tagline: 'Navigate static modal vamps, minor/Andalusian cadences, rapid changes, and 3-chorus arcs.',
      philosophy: 'True fluency means adapting your melodic vocabulary to any harmonic environment—generating momentum over a single static chord, snapping into dark minor/Andalusian leading tones, staying crisp at two chords per bar, and shaping a multi-chorus solo from quiet exposition to climactic payoff.',
      lessons: [
        {
          id: 'p7-l1-static-modal',
          code: 'P7.1',
          level: 'Foundation',
          title: 'Static Modal Vamps (im7 Dorian)',
          summary: 'When chords never change, build momentum through motifs, space, register jumps, and the Dorian 6th.',
          why: (k) => `Over a static ${chordAt(k, 0, 'm7')} vamp, chord changes cannot do the storytelling for you. Highlighting the bright pink natural 6th (${noteAt(k, 9)}) against the minor 3rd (${noteAt(k, 3)})—while using motif inversion, dynamics, and space—keeps a 1-chord groove gripping.`,
          listenFor: (k) => [
            `Did you spotlight the sweet Dorian natural 6th (${noteAt(k, 9)}) resolving smoothly to the 5th (${noteAt(k, 7)})?`,
            'Did your solo stay compelling through motifs and space without slipping into nonstop noodling?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Isolate Minor 3rd & Dorian Natural 6th',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 84 BPM. Map ${k} Dorian on your instrument, spotlighting the green ♭3 (${noteAt(k, 3)}) and pink natural 6th (${noteAt(k, 9)}). Build compact 3-note motifs featuring ${noteAt(k, 9)} resolving down to ${noteAt(k, 7)}.`,
              config: {
                progression: [c(0, 'm7', 'im7', 2)],
                bpm: 84,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'dorian',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Dorian Natural 6th'
                }
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Static im7 Funk Vamp Development',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this static ${chordAt(k, 0, 'm7')} groove, generate all your musical momentum using motif inversion, register jumps, metric displacement, and the 2-beat silence rule.`,
              config: {
                progression: [c(0, 'm7', 'im7', 2), c(0, 'm7', 'im7', 2)],
                bpm: 92,
                chordTimbre: 'epiano',
                compStyle: 'funk',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'dorian',
                showNextGhost: false,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Dorian Natural 6th'
                }
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Full Dorian Modal Soloing',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo freely over the ${chordAt(k, 0, 'm7')} – ${chordAt(k, 5, '7')} Dorian vamp, weaving the bright pink natural 6th (${noteAt(k, 9)} — also the 3rd of ${chordAt(k, 5, '7')}!) into dramatic phrases.`,
              config: {
                progression: DORIAN_FUNK,
                bpm: 98,
                chordTimbre: 'organ',
                compStyle: 'charleston',
                bassMode: 'eighth',
                drumGroove: 'funk',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'dorian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: {
                  type: 'extra-interval',
                  semiFromChordRoot: 9,
                  degreeLabel: '6',
                  color: '#ec4899',
                  badge: 'Dorian 6th Color'
                }
              }
            }
          ]
        },
        {
          id: 'p7-l2-minor-andalusian',
          code: 'P7.2',
          level: 'Intermediate',
          title: 'Minor iiø7–V7–im7 & Andalusian Turnaround',
          summary: 'Outline dark minor tension and nail the dramatic V7 major-3rd leading tone snapping into tonic minor.',
          why: (k) => `In minor keys, the magic hinge is the Major 3rd of V7 (${noteAt(k, 11)} over ${chordAt(k, 7, '7')}), which creates razor-sharp harmonic tension that snaps up one half-step into ${noteAt(k, 0)} (Root of ${chordAt(k, 0, 'm')}). On the Andalusian cadence, follow the descending 3rds: ${noteAt(k, 3)} → ${noteAt(k, 2)} → ${noteAt(k, 0)} → ${noteAt(k, 11)} → ${noteAt(k, 0)}!`,
          listenFor: (k) => [
            `Did ${noteAt(k, 11)} (the major 3rd of ${chordAt(k, 7, '7')}) deliver unmistakable dramatic pull into ${chordAt(k, 0, 'm')}?`,
            'Did your phrases capture the dark, moody color of the half-diminished ♭5 and harmonic minor leading tone?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Map Minor Guide Tones & Leading Tone',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Metronome at 80 BPM over ${chordAt(k, 2, 'm7♭5')} → ${chordAt(k, 7, '7')} → ${chordAt(k, 0, 'm7')}. Connect the green 3rds and ♭5 tension: ${noteAt(k, 5)} (♭3 of iiø7) / ${noteAt(k, 8)} (♭5) → ${noteAt(k, 11)} (Major 3rd of V7) → ${noteAt(k, 0)} / ${noteAt(k, 3)} (tonic minor).`,
              config: {
                progression: MINOR_II_V_I,
                bpm: 80,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'harmonicminor',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Minor Jazz iiø7–V7–im7 Ballad',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this dark ${k} Minor ii–V–i Bossa groove, play noir-style lyrical lines that spotlight the ♭5 on ${chordAt(k, 2, 'm7♭5')} and land squarely on ${noteAt(k, 11)} over ${chordAt(k, 7, '7')}.`,
              config: {
                progression: MINOR_II_V_I,
                bpm: 86,
                chordTimbre: 'epiano',
                compStyle: 'bossa',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'full-chord',
                targetRoles: ['root', 'third', 'fifth', 'seventh'],
                bgScale: 'harmonicminor',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Andalusian Turnaround (i – ♭VII – ♭VI – V7)',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Solo over the ${k} Andalusian cycle (${chordAt(k, 0, 'm')} → ${chordAt(k, 10, '')} → ${chordAt(k, 8, 'maj7')} → ${chordAt(k, 7, '7')}), following the descending voice-leading line ${noteAt(k, 3)} → ${noteAt(k, 2)} → ${noteAt(k, 0)} → ${noteAt(k, 11)} and snapping back to ${noteAt(k, 0)}!`,
              config: {
                progression: ANDALUSIAN,
                bpm: 98,
                chordTimbre: 'clean_pure',
                compStyle: 'arpeggio',
                bassMode: 'two_feel',
                drumGroove: 'bossa',
                voicingMode: 'full',
                loop: true,
                targetPreset: 'custom',
                targetRoles: ['root', 'third'],
                bgScale: 'harmonicminor',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p7-l3-rapid-harmonic-rhythm',
          code: 'P7.3',
          level: 'Advanced',
          title: 'Rapid Harmonic Rhythm (2 Chords Per Bar)',
          summary: 'Navigate fast ½-bar (2-beat) chord changes by stripping lines down to crisp guide-tone skeletons.',
          why: () => 'When chords fly past every 2 beats, trying to run scales over each chord causes instant panic. Playing just ONE clean guide tone per chord first trains your eyes and ears to stay calm and ahead of rapid turnarounds.',
          listenFor: () => [
            'Did you stay relaxed and perfectly in time through every 2-beat chord shift?',
            'When adding short 2-note ornaments in Block 3, did your lines stay ahead of the barline rather than lagging behind?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: '1 Target Note Per ½-Bar Chord',
              fullMins: 10,
              expressMins: 4,
              instructions: () => 'Metronome at 76 BPM with 2-beat (½b) chords. Play strictly ONE single green 3rd or blue 7th per chord change—keep your phrasing calm and razor-accurate.',
              config: {
                progression: [
                  c(0, 'maj7', 'Imaj7', 0.5), c(9, '7', 'VI7', 0.5),
                  c(2, 'm7', 'iim7', 0.5), c(7, '7', 'V7', 0.5)
                ],
                bpm: 76,
                chordTimbre: 'mute',
                compStyle: 'sustained',
                bassMode: 'off',
                drumGroove: 'metronome',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Guide-Tone Skeletons Over Fast Turnaround',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Over this rapid ${k} turnaround (${chordAt(k, 0, 'maj7')} – ${chordAt(k, 9, '7')} – ${chordAt(k, 2, 'm7')} – ${chordAt(k, 7, '7')}, ½ bar each), play connected half-note guide-tone lines following the dashed ghost preview.`,
              config: {
                progression: [
                  c(0, 'maj7', 'Imaj7', 0.5), c(9, '7', 'VI7', 0.5),
                  c(2, 'm7', 'iim7', 0.5), c(7, '7', 'V7', 0.5)
                ],
                bpm: 84,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Ornaments & Approach Runs at Tempo',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `At brisk tempo over the ${k} ½-bar turnaround, weave short 2-note ornaments and chromatic steps between your guide-tone anchors without ever falling behind the changes.`,
              config: {
                progression: [
                  c(0, 'maj7', 'Imaj7', 0.5), c(9, '7', 'VI7', 0.5),
                  c(2, 'm7', 'iim7', 0.5), c(7, '7', 'V7', 0.5)
                ],
                bpm: 100,
                chordTimbre: 'piano',
                compStyle: 'jazz_swing',
                bassMode: 'walking',
                drumGroove: 'jazz_swing',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p7-l4-three-register-staircase',
          code: 'P7.4',
          level: 'Advanced',
          title: 'The Three-Register Staircase (3-Chorus Arc)',
          summary: 'Build a dramatic narrative arc: Chorus 1 Low Exposition → Chorus 2 Mid Development → Chorus 3 High Climax.',
          why: () => 'Solos fall flat when players blow all their fastest, highest ideas in Bar 2. Architecting three distinct tiers—patient low exposition, energized middle development, and soaring upper climax with a decisive cadence—keeps listeners hooked from start to finish.',
          listenFor: () => [
            'Was Chorus 1 uncluttered, patient, and restrained in the lower register?',
            'Did Chorus 2 organically develop Chorus 1’s motif in the middle register rather than starting an unrelated solo?',
            'Did Chorus 3 reach a genuine upper-register emotional peak and resolve cleanly onto Beat 1?'
          ],
          blocks: [
            {
              label: 'Block 1: Constraint',
              focus: 'Chorus 1: Low-Register Exposition',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Over a 12-Bar Blues in ${k}, restrict yourself strictly to your lower register, using 2–3 note motifs, quarter/half notes, soft dynamics, and generous space. Leave the listener wanting more.`,
              config: {
                progression: BLUES_12,
                bpm: 84,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Harmonic Drill',
              focus: 'Chorus 1 → Chorus 2 Transition (Mid Development)',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Play 2-chorus arcs over the ${k} blues: Chorus 1 stays sparse and low; at the turnaround into Chorus 2, climb into the middle register and develop your motif with eighth notes, triplets, metric displacement, and Call & Response.`,
              config: {
                progression: BLUES_12,
                bpm: 92,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Soloing Flow',
              focus: 'Complete 3-Chorus Staircase + High Climax',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Execute full 3-chorus solos in ${k}: Chorus 1 (Low Exposition) → Chorus 2 (Mid Development) → Chorus 3 (Upper-Register Climax with enclosures and peak dynamics, resolving decisively on Beat 1 of the final bar).`,
              config: {
                progression: BLUES_12,
                bpm: 98,
                chordTimbre: 'blues_drive',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'blues',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        },
        {
          id: 'p7-l5-multi-genre-capstone',
          code: 'P7.5',
          level: 'Advanced',
          title: 'Multi-Genre Capstone Synthesis',
          summary: 'Put every pillar together across three contrasting worlds: Blues, Rock/Pop, and Jazz Cycle.',
          why: () => 'The ultimate proof that constraints have become automatic reflexes is removing every artificial limit and hearing motifs, varied launchpads, smooth voice leading, breathing space, and dynamic arcs emerge naturally across any genre.',
          listenFor: () => [
            'Motif Integrity: Did your solos develop clear, memorable themes instead of wandering?',
            'Metric Diversity & Breathing: Did you vary launchpads and leave genuine space every 2 bars?',
            'Harmonic Precision & Arc: Did your lines outline every chord change and build toward a true climax?'
          ],
          blocks: [
            {
              label: 'Block 1: Blues Run',
              focus: '3-Chorus Blues Synthesis',
              fullMins: 10,
              expressMins: 4,
              instructions: (k) => `Perform a complete 3-chorus solo over this ${k} 12-Bar Blues combining motifs, off-beat entries, tritone swaps, and the Three-Register Staircase.`,
              config: {
                progression: BLUES_12,
                bpm: 96,
                chordTimbre: 'epiano',
                compStyle: 'shuffle',
                bassMode: 'walking',
                drumGroove: 'shuffle',
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-root',
                targetRoles: ['root', 'third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 2: Rock Run',
              focus: '3-Chorus Mixolydian Rock Synthesis',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Switch musical dialects cleanly! Play a complete 3-chorus solo over ${chordAt(k, 0, '')} – ${chordAt(k, 10, '')} – ${chordAt(k, 5, '')} – ${chordAt(k, 0, '')} weaving Falling 3rds, Flat-7th slides, and dynamic phrasing.`,
              config: {
                progression: ROCK_MIXOLYDIAN,
                bpm: 114,
                chordTimbre: 'rock_plexi',
                compStyle: 'folk_strum',
                bassMode: 'eighth',
                drumGroove: 'rock',
                voicingMode: 'triad',
                loop: true,
                targetPreset: 'triad',
                targetRoles: ['root', 'third', 'fifth'],
                bgScale: 'mixolydian',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            },
            {
              label: 'Block 3: Jazz Run',
              focus: 'Full Circle-of-Fifths Cycle Synthesis',
              fullMins: 15,
              expressMins: 7,
              instructions: (k) => `Finish over the ${k} Autumn Leaves Circle-of-Fifths cycle—combining smooth guide-tone bridges, enclosures, varied launchpads, and vocal breathing space across Major and Minor ii–V–I shifts.`,
              config: {
                presetName: 'Autumn Leaves Circle-of-Fifths',
                bpm: 112,
                voicingMode: 'shell',
                loop: true,
                targetPreset: 'guide-only',
                targetRoles: ['third', 'seventh'],
                bgScale: 'none',
                showNextGhost: true,
                showNotes: true,
                showDegrees: true,
                trainingOverlay: null
              }
            }
          ]
        }
      ]
    }
  ];

  /* ===========================================================================
     SOLO DIAGNOSTIC & TROUBLESHOOTING PROTOCOL ("FIX A FLAW")
     =========================================================================== */
  const DIAGNOSTIC_FIXES = [
    {
      id: 'diag-noodling',
      icon: '🌀',
      symptom: '"Noodling" / Endless Scale Running',
      flaw: 'Lack of motif commitment; fingers moving on autopilot without melodic intent.',
      drillName: 'The 3-Note Rule',
      prescription: 'Lock yourself into strictly 3 pitches (degrees 1, 3, 5) and force rhythm, space, and dynamics to carry all the musical interest.',
      lessonId: 'p1-l1-three-note-rule',
      blockIndex: 0
    },
    {
      id: 'diag-plodding',
      icon: '🧱',
      symptom: 'Predictable, Plodding Feel',
      flaw: '"Downbeat Disease" — starting every phrase squarely on Beat 1 and stopping on Beat 4.',
      drillName: 'The Beat 1 Ban',
      prescription: 'Strictly forbid starting any phrase on Beat 1. Launch every idea on Beat 2 or the "& of 4" pickup until off-beat entries feel automatic.',
      lessonId: 'p2-l1-beat-one-ban',
      blockIndex: 0
    },
    {
      id: 'diag-disconnected',
      icon: '🌫️',
      symptom: 'Disconnected From the Chord Changes',
      flaw: 'Playing generic parent scales across the whole track instead of targeting defining chord tones.',
      drillName: 'Guide-Tone Only Soloing',
      prescription: 'Strip your solo down to strictly the 3rds and 7ths of each chord as sustained notes before reintroducing passing tones.',
      lessonId: 'p4-l1-isolating-thirds',
      blockIndex: 1
    },
    {
      id: 'diag-monotony',
      icon: '📏',
      symptom: 'Rhythmic Monotony',
      flaw: 'Defaulting to continuous eighth notes without contrast or subdivision shifts.',
      drillName: 'The Rhythmic Pyramid Drill',
      prescription: 'Deliberately cycle gears every bar: Whole note → Quarters → Eighths → Triplets → 2 full beats of silence.',
      lessonId: 'p6-l2-rhythmic-pyramid',
      blockIndex: 0
    },
    {
      id: 'diag-breathless',
      icon: '😮‍💨',
      symptom: 'Breathless, Overcrowded Solos',
      flaw: 'Zero phrasing space; playing continuously without letting ideas or the band breathe.',
      drillName: 'The Two-Beat Silence Law',
      prescription: 'Forbid yourself from playing longer than 2 consecutive measures without leaving at least 2 full beats of complete silence.',
      lessonId: 'p6-l1-two-beat-silence',
      blockIndex: 0
    },
    {
      id: 'diag-no-arc',
      icon: '📉',
      symptom: 'Solo Lacks Climax or Narrative Arc',
      flaw: 'Static volume, unchanging register, and flat emotional energy from start to finish.',
      drillName: 'The Three-Register Staircase',
      prescription: 'Architect 3 distinct tiers: Chorus 1 sparse in the low register, Chorus 2 developed in the middle register, Chorus 3 soaring in the upper register.',
      lessonId: 'p7-l4-three-register-staircase',
      blockIndex: 0
    }
  ];

  /* ===========================================================================
     MASTER REFERENCE & PHILOSOPHY BUILDER (UNIVERSAL SCALE DEGREES)
     =========================================================================== */
  function buildReferenceData() {
    return {
      principles: [
        { title: 'The Motif as Genetic Code', text: 'Anchor the listener with a concise 2–4 note statement rather than flooding every bar with scales.' },
        { title: 'Organic Development Over Novelty', text: 'Treat your opening motif like clay—repeat, stretch, invert, or displace it instead of inventing unrelated ideas.' },
        { title: 'Conversational Syntax', text: 'Balance open-ended ascending Questions (Calls) with grounded descending Answers (Responses) and breathing space.' },
        { title: 'Metric Liberation', text: 'Break "Downbeat Disease" by launching phrases from all 8 eighth-note slots and contrasting strong-beat vs. weak-beat endings.' },
        { title: 'Harmonic Target Vision', text: 'Outline chord changes effortlessly by voice-leading 3rds and 7ths by half-step, framed with chromatic approaches.' }
      ],
      toneMatrix: [
        {
          context: 'Major Triad (I or IV)',
          seventh: 'Major 7th (degree 7 over I, degree 3 over IV): Lush, floating, modern sheen.',
          sixth: 'Major 6th (degree 6 over I, degree 2 over IV): Warm, buoyant resting pad; degree 6 of I pivots directly into the 3rd of IV.'
        },
        {
          context: 'Dominant / Blues (V7 or I7)',
          seventh: 'Minor / ♭7 (degree 4 over V, degree ♭7 over I7): Driving bluesy pull and tritone resolution.',
          sixth: 'Major 6th (degree 3 over V, degree 6 over I7): Vocal "sweet note" favored in blues & jazz.'
        },
        {
          context: 'Minor Triad (ii, iii, vi)',
          seventh: 'Minor 7th (degree 1 over ii, degree 2 over iii, degree 5 over vi): Soulful, stable, diatonic consonance.',
          sixth: 'Natural 6th (degree 7 over ii, degree ♯4 over vi): Bright Dorian signature; avoids ♭6 friction against the 5th.'
        },
        {
          context: 'Tonic Minor (i)',
          seventh: 'Minor 7th (degree ♭7) for modern soul/modal, or Major 7th (degree 7) for noir/ballad tension.',
          sixth: 'Natural 6th (degree 6): Melodic minor / Dorian elegance.'
        }
      ],
      motifToolkit: [
        { name: 'Exact Reiteration', role: 'Establishes deliberate intent', example: 'Degrees 1 – 3 – 5 repeated identically in Bar 2' },
        { name: 'Metric Displacement', role: 'Shifts rhythmic gravity', example: 'Move the exact same motif from Beat 1 to "& of 2"' },
        { name: 'Melodic Inversion', role: 'Mirrors vertical contour', example: 'Ascending 1 → 3 → 5 becomes descending 5 → 3 → 1' },
        { name: 'Rhythmic Augmentation', role: 'Creates emotional weight', example: 'Stretch quarter notes into wide half notes' },
        { name: 'Rhythmic Diminution', role: 'Injects forward urgency', example: 'Compress quarter notes into crisp eighths or triplets' },
        { name: 'Intervallic Expansion', role: 'Adds dramatic vocal climax', example: 'Degrees 1 – 3 – 5 stretched to 1 – 5 – High 1 (octave leap)' },
        { name: 'Enclosure Addition', role: 'Frames targets with tension', example: 'Target degree 3 preceded by 4 (diatonic above) → ♭3 (half-step below) → 3' }
      ],
      voiceLeadingMaps: [
        {
          title: 'Standard ii–V–I (iim7 → V7 → Imaj7)',
          paths: [
            'Guide-Tone Step-Down: Degree 1 (♭7 of ii) steps down a half-step to Degree 7 (3rd of V); Degree 4 (♭7 of V) steps down a half-step to Degree 3 (3rd of I).',
            'Common-Tone Pivot: Degree 4 (♭3 of ii) holds steady across the barline as ♭7 of V before stepping down to Degree 3 (3rd of I).'
          ]
        },
        {
          title: '12-Bar Blues Swap (I7 → IV7)',
          paths: [
            'Tritone Swap: Degree 3 (3rd of I7) drops a half-step to ♭3 (♭7 of IV7), while ♭7 (♭7 of I7) drops a half-step to Degree 6 (3rd of IV7).'
          ]
        },
        {
          title: 'Rock / Mixolydian (I → ♭VII → IV)',
          paths: [
            'Falling 3rds: Degree 3 (3rd of I) → Degree 2 (3rd of ♭VII) → Degree 1 (5th of IV) or Degree 6 (3rd of IV).',
            'Flat-7th Slide: Degree 1 (Root of I) → Degree ♭7 (Root of ♭VII) → Degree 6 (3rd of IV).'
          ]
        },
        {
          title: 'Pop / Ballad Cycle (I → vi → IV → V)',
          paths: [
            'Shared Horizon: Degree 1 holds steady across I (Root), vi (♭3), and IV (5th) before stepping down a half-step to Degree 7 (3rd of V).'
          ]
        },
        {
          title: 'Andalusian Cadence (i → ♭VII → ♭VI → V7)',
          paths: [
            'Leading-Tone Line: Degree ♭3 (♭3 of i) → Degree 2 (3rd of ♭VII) → Degree 1 (3rd of ♭VI) → Degree 7 (Major 3rd of V7) → snaps up a half-step to Degree 1!'
          ]
        }
      ]
    };
  }

  function findLessonById(lessonId) {
    for (const pillar of PRACTICE_PILLARS) {
      const idx = pillar.lessons.findIndex(l => l.id === lessonId);
      if (idx >= 0) {
        return { pillar, lesson: pillar.lessons[idx], lessonIndex: idx };
      }
    }
    return null;
  }

  global.OMNITUNE_PRACTICE_CURRICULUM = {
    PILLARS: PRACTICE_PILLARS,
    DIAGNOSTICS: DIAGNOSTIC_FIXES,
    MAJOR_SCALE_SEMIS,
    buildReferenceData,
    findLessonById,
    noteAt,
    chordAt
  };
})(window);
