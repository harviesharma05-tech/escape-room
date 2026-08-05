/* ==========================================
   ESCAPE ROOM - AUDIO.JS
========================================== */

const AudioManager = {

    enabled: true,

    music: document.getElementById("bgMusic"),

    sounds: {

        click: document.getElementById("clickSound"),

        unlock: document.getElementById("unlockSound"),

        success: new Audio("assets/audio/sfx/success.mp3"),

        wrong: new Audio("assets/audio/sfx/wrong.mp3"),

        pickup: new Audio("assets/audio/sfx/pickup.mp3")

    },

    //---------------------------------------

    playMusic() {

        if (!this.enabled) return;

        if (!this.music) return;

        this.music.volume = 0.4;

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

        if (!this.enabled) return;

        if (!this.sounds[sound]) return;

        this.sounds[sound].currentTime = 0;

        this.sounds[sound].play();

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

    }

};

//==========================================

window.addEventListener("click", () => {

    AudioManager.playMusic();

}, { once: true });
