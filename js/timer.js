/* ==========================================
   ESCAPE ROOM - TIMER.JS
========================================== */

const Timer = {

    interval: null,

    totalTime: 300, // 5 Minutes

    currentTime: 300,

    running: false,

    // ==========================
    // START TIMER
    // ==========================

    start(duration) {

        this.stop();

        this.running = true;

        if (typeof duration === "number") {

            this.totalTime = duration;

        }

        this.currentTime = this.totalTime;

        if (typeof GameState !== "undefined") {

            GameState.timer.time = this.currentTime;

        }

        this.update();

        this.interval = setInterval(() => {

            this.currentTime--;

            GameState.timer.time = this.currentTime;

            this.update();

            if (this.currentTime <= 0) {

                this.timeout();

            }

        }, 1000);

    },

    // ==========================
    // STOP TIMER
    // ==========================

    stop() {

        if (this.interval) {

            clearInterval(this.interval);

            this.interval = null;

        }

        this.running = false;

    },

    // ==========================
    // PAUSE TIMER
    // ==========================

    pause() {

        if (!this.running) return;

        clearInterval(this.interval);

        this.running = false;

    },

    // ==========================
    // RESUME TIMER
    // ==========================

    resume() {

        if (this.running) return;

        this.running = true;

        this.interval = setInterval(() => {

            this.currentTime--;

            GameState.timer.time = this.currentTime;

            this.update();

            if (this.currentTime <= 0) {

                this.timeout();

            }

        }, 1000);

    },

    // ==========================
    // RESET TIMER
    // ==========================

    reset() {

        this.stop();

        this.currentTime = this.totalTime;

        this.update();

    },

    // ==========================
    // UPDATE HUD
    // ==========================

    update() {

        const timer = document.getElementById("timeValue");

        if (!timer) return;

        timer.innerHTML = formatTime(this.currentTime);

        if (this.currentTime <= 60) {

            timer.classList.add("danger");

        } else {

            timer.classList.remove("danger");

        }

    },

    // ==========================
    // TIME BONUS
    // ==========================

    getBonus() {

        return this.currentTime * 5;

    },

    // ==========================
    // TIME OUT
    // ==========================

    timeout() {

        this.stop();

        GameState.lost = true;

        AudioManager.play("wrong");

        showMessage("⏰ Time's Up!", "error");

        const room = document.getElementById("room");
        const hud = document.getElementById("hud");
        const inventory = document.getElementById("inventory");
        const lose = document.getElementById("loseScreen");

        if (room) room.classList.add("hidden");
        if (hud) hud.classList.add("hidden");
        if (inventory) inventory.classList.add("hidden");

        if (lose) lose.classList.remove("hidden");

    }

};

// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

function startTimer() {

    Timer.start();

}

function stopTimer() {

    Timer.stop();

}

function pauseTimer() {

    Timer.pause();

}

function resumeTimer() {

    Timer.resume();

}

function resetTimer() {

    Timer.reset();

}

function getTimeBonus() {

    return Timer.getBonus();

}

console.log("timer.js Loaded Successfully");
