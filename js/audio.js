/* ==========================================
   ESCAPE ROOM - AUDIO.JS
========================================== */

const AudioManager = {

    enabled: true,

    musicEnabled: true,

    soundEnabled: true,

    volume: 1,

    music: new Audio("assets/audio/bgm/theme.mp3"),

    sounds: {

        click: new Audio("assets/audio/sfx/click.mp3"),

        unlock: new Audio("assets/audio/sfx/unlock.mp3"),

        success: new Audio("assets/audio/sfx/success.mp3"),

        wrong: new Audio("assets/audio/sfx/wrong.mp3"),

        pickup: new Audio("assets/audio/sfx/pickup.mp3")

    },

    //---------------------------------------

    init() {

        this.music.loop = true;

    },

    //---------------------------------------

    playMusic() {

        if (!this.enabled || !this.musicEnabled) return;

        if (!this.music) return;

        this.music.volume = 0.4 * this.volume;

        this.music.play().catch(() => {

            console.log("Autoplay blocked by browser.");

        });

    },

    //---------------------------------------

    stopMusic() {

        if (!this.music) return;

        this.music.pause();

        this.music.currentTime = 0;

    },

    //---------------------------------------

    play(sound) {

        if (!this.enabled || !this.soundEnabled) return;

        if (!this.sounds[sound]) return;

        this.sounds[sound].volume = this.volume;

        this.sounds[sound].currentTime = 0;

        this.sounds[sound].play().catch(() => {});

    },

    //---------------------------------------

    mute() {

        this.enabled = false;

        this.stopMusic();

    },

    //---------------------------------------

    unmute() {

        this.enabled = true;

        this.playMusic();

    },

    //---------------------------------------

    toggle() {

        this.enabled = !this.enabled;

        if (this.enabled) {

            this.playMusic();

        } else {

            this.stopMusic();

        }

    },

    //---------------------------------------

    setMusicEnabled(value) {

        this.musicEnabled = value;

        if (value) {

            this.playMusic();

        } else {

            this.stopMusic();

        }

    },

    //---------------------------------------

    setVolume(value) {

        this.volume = value;

        if (this.music) {

            this.music.volume = 0.4 * this.volume;

        }

    }

};

AudioManager.init();

//==========================================

window.addEventListener("click", () => {

    AudioManager.playMusic();

}, { once: true });
