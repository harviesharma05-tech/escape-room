/* ==========================================
   ESCAPE ROOM - TIMER.JS
========================================== */

let totalTime = 15 * 60; // 15 Minutes
let timerInterval = null;
let paused = false;

const timerElement = document.getElementById("timer");

// ===============================
// Start Timer
// ===============================

function startTimer() {

    if (timerInterval) return;

    updateTimer();

    timerInterval = setInterval(() => {

        if (paused) return;

        totalTime--;

        updateTimer();

        if (totalTime <= 60) {

            timerElement.style.color = "#ff4444";
            timerElement.classList.add("blink");

        }

        if (totalTime <= 0) {

            gameOver();

        }

    },1000);

}

// ===============================
// Update Display
// ===============================

function updateTimer(){

    const minutes = Math.floor(totalTime / 60);

    const seconds = totalTime % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

// ===============================
// Pause
// ===============================

function pauseTimer(){

    paused = true;

}

// ===============================
// Resume
// ===============================

function resumeTimer(){

    paused = false;

}

// ===============================
// Stop
// ===============================

function stopTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

}

// ===============================
// Bonus Score
// ===============================

function getTimeBonus(){

    return totalTime;

}

// ===============================
// Game Over
// ===============================

function gameOver(){

    stopTimer();

    document
        .getElementById("room")
        .classList.add("hidden");

    document
        .getElementById("hud")
        .classList.add("hidden");

    document
        .getElementById("inventory")
        .classList.add("hidden");

    document
        .getElementById("gameOver")
        .classList.remove("hidden");

}
