/* ==========================================
   ESCAPE ROOM - APP.JS
========================================== */

const App = {

    started: false,

    /* ==========================
       INIT
    ========================== */

    init() {

        console.log("Escape Room Loading...");

        this.bindEvents();

        this.showLoading();

    },

    /* ==========================
       LOADING
    ========================== */

    showLoading() {

        const loading = document.getElementById("loadingScreen");

        const menu = document.getElementById("mainMenu");

        setTimeout(() => {

            if (loading)
                loading.classList.add("hidden");

            if (menu)
                menu.classList.remove("hidden");

        }, 2000);

    },

    /* ==========================
       EVENTS
    ========================== */

    bindEvents() {

        const startBtn = document.getElementById("startBtn");

        if (startBtn) {

            startBtn.onclick = () => {

                this.startGame();

            };

        }

        const continueBtn = document.getElementById("continueBtn");

        if (continueBtn) {

            continueBtn.onclick = () => {

                this.continueGame();

            };

        }

        const leaderboardBtn = document.getElementById("leaderboardBtn");

        if (leaderboardBtn) {

            leaderboardBtn.onclick = () => {

                this.openLeaderboard();

            };

        }

        const settingsBtn = document.getElementById("settingsBtn");

        if (settingsBtn) {

            settingsBtn.onclick = () => {

                this.openSettings();

            };

        }

    },

    /* ==========================
       START GAME
    ========================== */

    startGame() {

        console.log("Starting New Game");

        if (typeof GameState !== "undefined" && GameState.reset)
            GameState.reset();

        this.started = true;

        if (typeof GameState !== "undefined")
            GameState.started = true;

        if (typeof Settings !== "undefined") {

            if (typeof GameState !== "undefined") {

                GameState.player.hints = Settings.getStartingHints();
                GameState.player.hintsUsed = 0;
                GameState.player.itemsCollected = 0;

            }

        }

        this.openGame();

        if (typeof RoomGenerator !== "undefined")
            RoomGenerator.generate();

        const roomImage = document.getElementById("roomImage");

        if (roomImage)
            console.log("Room Image:", roomImage.src);

        if (typeof HUD !== "undefined" && HUD.update)
            HUD.update();

        if (typeof Game !== "undefined" && Game.updateHUD)
            Game.updateHUD();

        if (typeof Inventory !== "undefined")
            Inventory.render();

        if (typeof startTimer === "function") {

            const duration = (typeof Settings !== "undefined")
                ? Settings.getTimerDuration()
                : undefined;

            Timer.start(duration);

        }

        if (typeof AudioManager !== "undefined" &&
            AudioManager.playMusic)
            AudioManager.playMusic();

        if (typeof showMessage === "function")
            showMessage("Escape Started!");

    },

    /* ==========================
       CONTINUE
    ========================== */

    continueGame() {

        if (typeof SaveManager !== "undefined") {

            if (!SaveManager.load()) {

                if (typeof showMessage === "function")
                    showMessage("No Save Found", "error");

                return;

            }

        }

        this.started = true;

        if (typeof GameState !== "undefined")
            GameState.started = true;

        this.openGame();

        if (typeof HUD !== "undefined" && HUD.update)
            HUD.update();

        if (typeof Inventory !== "undefined")
            Inventory.render();

        if (typeof startTimer === "function")
            startTimer();

        if (typeof AudioManager !== "undefined" &&
            AudioManager.playMusic)
            AudioManager.playMusic();

    },

    /* ==========================
       OPEN GAME
    ========================== */

    openGame() {

        const menu = document.getElementById("mainMenu");

        const gameScreen = document.getElementById("gameScreen");

        const room = document.getElementById("room");

        const hud = document.getElementById("hud");

        const inventory = document.getElementById("inventory");

        const mission = document.getElementById("missionPanel");

        if (menu)
            menu.classList.add("hidden");

        if (gameScreen)
            gameScreen.classList.remove("hidden");

        if (room)
            room.classList.remove("hidden");

        if (hud)
            hud.classList.remove("hidden");

        if (inventory)
            inventory.classList.remove("hidden");

        if (mission)
            mission.classList.remove("hidden");

    },

    /* ==========================
       LEADERBOARD
    ========================== */

    openLeaderboard() {

        const screen =
            document.getElementById("leaderboardScreen");

        if (screen)
            screen.classList.remove("hidden");

        if (typeof Leaderboard !== "undefined" &&
            Leaderboard.render)
            Leaderboard.render();

    },

    /* ==========================
       SETTINGS
    ========================== */

    openSettings() {

        const panel =
            document.getElementById("settingsPanel");

        if (panel)
            panel.classList.remove("hidden");

    }

};

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

    const closeLeaderboard =
        document.getElementById("closeLeaderboard");

    if (closeLeaderboard) {

        closeLeaderboard.onclick = () => {

            document
                .getElementById("leaderboardScreen")
                .classList.add("hidden");

        };

    }

    const closeSettings =
        document.getElementById("closeSettings");

    if (closeSettings) {

        closeSettings.onclick = () => {

            document
                .getElementById("settingsPanel")
                .classList.add("hidden");

        };

    }

    const closePuzzle =
        document.getElementById("closePuzzle");

    if (closePuzzle) {

        closePuzzle.onclick = () => {

            document
                .getElementById("puzzleModal")
                .classList.add("hidden");

        };

    }

});
