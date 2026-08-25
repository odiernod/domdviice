var clickVoice; // click voice
var voices = []; // chord voices
var channels = []; // keyboard channels
var bend = 1;

// Create an oscillator and an amplifier.
function initAudio() {
    if (!audioContext) {
        if (typeof createAudioContext === 'function') {
            audioContext = createAudioContext();
        }
    }
    if (!audioContext) return;
    if (!clickVoice) {
        clickVoice = new Voice(); // voice for mouse clicks
    }
    if (voices.length === 0) {
        for (let i = 0; i < 8; ++i) { // voices for chords
            voices.push(new Voice());
        }
    }
    if (channels.length === 0) {
        for (let i = 0; i < 8; ++i) { // voices for keyboard presses
            channels.push(new Voice());
        }
    }
}

function Voice() {
    this.note = null;
    this.osc = audioContext.createOscillator();
    fixOscillator(this.osc);
    this.frequency = 440;
    this.osc.frequency.value = 440;
    this.amp = audioContext.createGain();
    this.amp.gain.value = 0;

    // Connect oscillator to amp and amp to audioContext destination
    this.osc.connect(this.amp);
    this.amp.connect(audioContext.destination);
    this.osc.start(0);

    // LFO for vibrato
    this.mosc = audioContext.createOscillator();
    this.mosc.frequency.value = 6; // vibrato rate
    this.mamp = audioContext.createGain();
    this.mamp.gain.value = 0; // vibrato depth
    this.mosc.connect(this.mamp);
    this.mamp.connect(this.osc.frequency);
    this.mosc.start();

    this.start = function(frequency, size = 1, pluck = false) {
        if (!audioContext) return;
        var now = audioContext.currentTime;
        this.frequency = frequency;
        this.osc.frequency.setValueAtTime(this.frequency * bend, now);
        this.amp.gain.cancelScheduledValues(now);

        if (pluck) {
            // Pluck Mode: rich string-like triangle wave with sharp percussive attack and natural acoustic exponential decay
            this.osc.type = 'triangle';
            var peakGain = 0.55 / (size + 1);
            this.amp.gain.setValueAtTime(0.0001, now);
            this.amp.gain.linearRampToValueAtTime(peakGain, now + 0.003);
            this.amp.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
        } else {
            // Synth Mode: smooth sine tone that sustains continuously while held
            this.osc.type = 'sine';
            var sustainGain = 0.4 / (size + 1);
            this.amp.gain.setValueAtTime(Math.max(0.0001, this.amp.gain.value), now);
            this.amp.gain.linearRampToValueAtTime(sustainGain, now + 0.02);
        }
    };

    this.stop = function() {
        if (!audioContext) return;
        var now = audioContext.currentTime;
        this.amp.gain.cancelScheduledValues(now);
        this.amp.gain.setValueAtTime(Math.max(0.0001, this.amp.gain.value), now);
        this.amp.gain.linearRampToValueAtTime(0.0001, now + 0.06);
    };

    this.changeBend = function(value) {
        bend = 2 ** (value / 12);
        this.osc.frequency.setValueAtTime(this.frequency * bend, audioContext.currentTime);
    };

    this.stopBend = function() {
        this.osc.frequency.setValueAtTime(this.frequency, audioContext.currentTime);
        bend = 1;
    };

    this.waveform = function(choice) {
        if (!choice) return this.osc.type;
        else this.osc.type = {Q: 'sine', W: 'triangle', E: 'square', R: 'sawtooth'}[choice];
    };

    this.vibrato = function(choice) {
        if (!choice) return (parseInt(this.mamp.gain.value / 5) || '`').toString();
        else this.mamp.gain.value = {'`': 0, '1': 5, '2': 10, '3': 15, '4': 20, '5': 25}[choice];
    };
}

// Auto-initialize when possible
if (typeof window !== 'undefined') {
    window.addEventListener('load', initAudio);
}