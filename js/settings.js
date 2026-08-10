/* ==========================================
   ESCAPE ROOM - SETTINGS.JS
========================================== */

const Settings = {

    data: {

        difficulty: "medium",

        music: true,

        sound: true,

        volume: 100

    },

    // ==========================
    // INITIALIZE
    // ==========================

    init() {

        const saved = load("escape_settings");

        if (saved) {

            this.data = saved;

        }

        this.apply();

    },

    // ==========================
    // APPLY SETTINGS
    // ==========================

    apply() {

        const difficulty = document.getElementById("difficulty");
        const music = document.getElementById("musicToggle");
        const sound = document.getElementById("soundToggle");
        const volume = document.getElementById("volumeSlider");

        if (difficulty)
            difficulty.value = this.data.difficulty;

        if (music)
            music.checked = this.data.music;

        if (sound)
            sound.checked = this.data.sound;

        if (volume)
            volume.value = this.data.volume;

        if (typeof AudioManager !== "undefined") {

            AudioManager.soundEnabled = this.data.sound;
            AudioManager.setVolume(this.data.volume / 100);
            AudioManager.setMusicEnabled(this.data.music);

        }

    },

    // ==========================
    // SAVE SETTINGS
    // ==========================

    save() {

        const difficulty = document.getElementById("difficulty");
        const music = document.getElementById("musicToggle");
        const sound = document.getElementById("soundToggle");
        const volume = document.getElementById("volumeSlider");

        if (difficulty)
            this.data.difficulty = difficulty.value;

        if (music)
            this.data.music = music.checked;

        if (sound)
            this.data.sound = sound.checked;

        if (volume)
            this.data.volume = parseInt(volume.value);

        save("escape_settings", this.data);

        this.apply();

        showMessage("⚙ Settings Saved");

    },

    // ==========================
    // DIFFICULTY -> TIME / HINTS
    // ==========================

    getTimerDuration() {

        switch (this.data.difficulty) {

            case "easy": return 420;   // 7 minutes per room

            case "hard": return 240;   // 4 minutes per room

            default: return 300;       // 5 minutes per room (medium)

        }

    },

    getStartingHints() {

        switch (this.data.difficulty) {

            case "easy": return 5;

            case "hard": return 1;

            default: return 3;

        }

    },

    // ==========================
    // RESET SETTINGS
    // ==========================

    reset() {

        this.data = {

            difficulty: "medium",

            music: true,

            sound: true,

            volume: 100

        };

        save("escape_settings", this.data);

        this.apply();

        showMessage("Settings Reset");

    }

};

// ==========================================
// DOM READY
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    Settings.init();

    const saveBtn = document.getElementById("saveSettings");

    if (saveBtn) {

        saveBtn.onclick = () => {

            Settings.save();

        };

    }

    const resetBtn = document.getElementById("resetSettings");

    if (resetBtn) {

        resetBtn.onclick = () => {

            Settings.reset();

        };

    }

});

console.log("settings.js Loaded Successfully");
