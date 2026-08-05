/* ==========================================
   ESCAPE ROOM - APP.JS
========================================== */

const Game = {

    started: false,
    score: 0,
    hints: 3,
    time: 900,

    init() {

        console.log("Escape Room Initialized");

        this.bindEvents();

        this.showLoading();

    },

    showLoading() {

        const loading = document.getElementById("loadingScreen");

        setTimeout(() => {

            loading.classList.add("hidden");

            document
                .getElementById("mainMenu")
                .classList.remove("hidden");

        }, 2000);

    },

    bindEvents() {

        const start = document.getElementById("startBtn");

        if (start) {

            start.addEventListener("click", () => {

                this.startGame();

            });

        }

        const restart = document.getElementById("restart");

        if (restart) {

            restart.addEventListener("click", () => {

                location.reload();

            });

        }

        const playAgain = document.getElementById("playAgain");

        if (playAgain) {

            playAgain.addEventListener("click", () => {

                location.reload();

            });

        }

    },

    startGame() {

        this.started = true;

        document
            .getElementById("mainMenu")
            .classList.add("hidden");

        document
            .getElementById("room")
            .classList.remove("hidden");

        document
            .getElementById("hud")
            .classList.remove("hidden");

        document
            .getElementById("inventory")
            .classList.remove("hidden");

        if (typeof startTimer === "function") {

            startTimer();

        }

        console.log("Game Started");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Game.init();

});
