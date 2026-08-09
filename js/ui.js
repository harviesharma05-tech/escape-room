/* ==========================================
   ESCAPE ROOM - UI.JS
========================================== */

const UI = {

    currentScreen: "loading",

    /* ==========================
       INITIALIZE
    ========================== */

    init() {

        console.log("UI Initialized");

        this.bindButtons();

    },

    /* ==========================
       BUTTONS
    ========================== */

    bindButtons() {

        this.bind("startBtn", () => App.startGame());

        this.bind("continueBtn", () => App.continueGame());

        this.bind("leaderboardBtn", () => this.showLeaderboard());

        this.bind("settingsBtn", () => this.showSettings());

        this.bind("achievementsBtn", () => this.showAchievements());

        this.bind("closeAchievements", () => this.hideAchievements());

        this.bind("hintBtn", () => {

            if (typeof Game !== "undefined" && Game.useHint) {

                Game.useHint();

            }

        });

        this.bind("closeLeaderboard", () => this.hideLeaderboard());

        this.bind("closeSettings", () => this.hideSettings());

        this.bind("closePuzzle", () => this.closePuzzle());

        this.bind("playAgain", () => location.reload());

        this.bind("restart", () => location.reload());

    },

    bind(id, callback) {

        const element = document.getElementById(id);

        if (element)
            element.onclick = callback;

    },

    /* ==========================
       SHOW / HIDE
    ========================== */

    show(id) {

        const element = document.getElementById(id);

        if (element)
            element.classList.remove("hidden");

    },

    hide(id) {

        const element = document.getElementById(id);

        if (element)
            element.classList.add("hidden");

    },

    /* ==========================
       OPEN GAME
    ========================== */

    openGame() {

        this.hide("loadingScreen");

        this.hide("mainMenu");

        this.show("gameScreen");

        this.show("room");

        this.show("hud");

        this.show("inventory");

        this.show("missionPanel");

        console.log("Game Screen Opened");

    },

    /* ==========================
       LEADERBOARD
    ========================== */

    showLeaderboard() {

        this.show("leaderboardScreen");

        if (typeof Leaderboard !== "undefined" &&
            Leaderboard.render) {

            Leaderboard.render();

        }

    },

    hideLeaderboard() {

        this.hide("leaderboardScreen");

    },

    /* ==========================
       ACHIEVEMENTS
    ========================== */

    showAchievements() {

        this.show("achievementsPanel");

        if (typeof Achievements !== "undefined" &&
            Achievements.render) {

            Achievements.render();

        }

    },

    hideAchievements() {

        this.hide("achievementsPanel");

    },

    /* ==========================
       SETTINGS
    ========================== */

    showSettings() {

        this.show("settingsPanel");

    },

    hideSettings() {

        this.hide("settingsPanel");

    },

    /* ==========================
       PUZZLE
    ========================== */

    openPuzzle() {

        this.show("puzzleModal");

    },

    closePuzzle() {

        this.hide("puzzleModal");

    },

    /* ==========================
       WIN
    ========================== */

    showWin(score) {

        this.hide("gameScreen");

        this.show("winScreen");

        const finalScore = document.getElementById("finalScore");

        if (finalScore)
            finalScore.textContent = "Final Score : " + score;

    },

    /* ==========================
       LOSE
    ========================== */

    showLose() {

        this.hide("gameScreen");

        this.show("loseScreen");

    },

    /* ==========================
       MESSAGE
    ========================== */

    message(text) {

        const box = document.getElementById("messageBox");

        const label = document.getElementById("messageText");

        if (!box || !label)
            return;

        label.textContent = text;

        box.classList.remove("hidden");

        clearTimeout(this.messageTimeout);

        this.messageTimeout = setTimeout(() => {

            box.classList.add("hidden");

        }, 2500);

    },

    /* ==========================
       TRANSITION
    ========================== */

    transition(callback) {

        const screen =
            document.getElementById("transitionScreen");

        if (!screen) {

            if (callback)
                callback();

            return;

        }

        screen.classList.remove("hidden");

        setTimeout(() => {

            if (callback)
                callback();

        }, 600);

        setTimeout(() => {

            screen.classList.add("hidden");

        }, 1200);

    },

    /* ==========================
       HUD
    ========================== */

    updateHUD() {

        if (typeof HUD !== "undefined" &&
            HUD.update)
            HUD.update();

    },

    /* ==========================
       LOADING
    ========================== */

    hideLoading() {

        this.hide("loadingScreen");

        this.show("mainMenu");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    UI.init();

});

console.log("ui.js Loaded Successfully");
