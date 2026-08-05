/* ==========================================
   ESCAPE ROOM - GAME.JS
========================================== */

// -----------------------------
// Game State
// -----------------------------

let hasKey = false;
let hasNote = false;
let gameWon = false;

// -----------------------------
// DOM Elements
// -----------------------------

const key = document.getElementById("objKey");
const note = document.getElementById("objNote");
const keypad = document.getElementById("objKeypad");
const door = document.getElementById("objDoor");

const room = document.getElementById("room");
const hud = document.getElementById("hud");
const inventory = document.getElementById("inventory");

const puzzleModal = document.getElementById("puzzleModal");

const closePuzzle =
    document.getElementById("closePuzzle");

const finalScore =
    document.getElementById("finalScore");

// =====================================
// KEY
// =====================================

if (key) {

    key.addEventListener("click", () => {

        if (hasKey) return;

        hasKey = true;

        key.classList.add("found");

        addItem("key");

        alert("🔑 Golden Key Collected!");

    });

}

// =====================================
// NOTE
// =====================================

if (note) {

    note.addEventListener("click", () => {

        if (hasNote) return;

        hasNote = true;

        note.classList.add("found");

        addItem("note");

        alert(
            "📜 Secret Note:\nThe keypad contains the answer..."
        );

    });

}

// =====================================
// KEYPAD
// =====================================

if (keypad) {

    keypad.addEventListener("click", () => {

        PuzzleManager.open();

    });

}

// =====================================
// CLOSE MODAL
// =====================================

if (closePuzzle) {

    closePuzzle.addEventListener("click", () => {

        puzzleModal.classList.add("hidden");

    });

}

// =====================================
// DOOR
// =====================================

if (door) {

    door.addEventListener("click", () => {

        if (!hasKey) {

            alert("🔒 You need a key.");

            door.classList.add("shake");

            setTimeout(() => {

                door.classList.remove("shake");

            }, 400);

            return;

        }

        if (door.dataset.open !== "true") {

            alert("🔢 Solve the keypad puzzle first.");

            return;

        }

        escapeRoom();

    });

}

// =====================================
// ESCAPE
// =====================================

function escapeRoom() {

    if (gameWon) return;

    gameWon = true;

    stopTimer();

    room.classList.add("hidden");

    hud.classList.add("hidden");

    inventory.classList.add("hidden");

    document
        .getElementById("winScreen")
        .classList.remove("hidden");

    let score = 1000;

    score += getTimeBonus();

    finalScore.innerHTML =
        "Final Score : " + score;

}

// =====================================
// RESTART
// =====================================

const restart =
    document.getElementById("restart");

if (restart) {

    restart.onclick = () => {

        location.reload();

    };

}

const playAgain =
    document.getElementById("playAgain");

if (playAgain) {

    playAgain.onclick = () => {

        location.reload();

    };

}
