/* ==========================================
   ESCAPE ROOM - GAME.JS
   PART 1
========================================== */

const Game = {

    /* ======================================
       GAME STATE
    ====================================== */

    started: false,
    paused: false,
    gameOver: false,

    score: 0,
    xp: 0,
    level: 1,

    currentRoom: 0,

    rooms: [],

    mission: "",

    /* ======================================
       DOM
    ====================================== */

    roomImage: null,

    roomValue: null,

    missionText: null,

    scoreValue: null,

    levelValue: null,

    xpBar: null,

    timeValue: null,

    hintValue: null,

    key: null,

    note: null,

    keypad: null,

    door: null,

    /* ======================================
       INIT
    ====================================== */

    init() {

        console.log("Game Initialized");

        this.cacheDOM();

        this.loadRooms();

        this.bindObjects();

        this.updateHUD();

    },

    /* ======================================
       CACHE DOM
    ====================================== */

    cacheDOM() {

        this.roomImage =
            document.getElementById("roomImage");

        this.roomValue =
            document.getElementById("roomValue");

        this.missionText =
            document.getElementById("missionText");

        this.scoreValue =
            document.getElementById("scoreValue");

        this.levelValue =
            document.getElementById("levelValue");

        this.xpBar =
            document.getElementById("xpBar");

        this.timeValue =
            document.getElementById("timeValue");

        this.hintValue =
            document.getElementById("hintValue");

        this.key =
            document.getElementById("objKey");

        this.note =
            document.getElementById("objNote");

        this.keypad =
            document.getElementById("objKeypad");

        this.door =
            document.getElementById("objDoor");

    },

    /* ======================================
       ROOM DATA
    ====================================== */

    loadRooms() {

        this.rooms = [

            {

                name: "Secret Laboratory",

                image: "assets/images/rooms/Lab.jpeg",

                mission: "Find the Golden Key"

            },

            {

                name: "Haunted Library",

                image: "assets/images/rooms/Library.jpeg",

                mission: "Collect the Secret Note"

            },

            {

                name: "Cyber Bunker",

                image: "assets/images/rooms/Bunker.jpeg",

                mission: "Unlock The Vault"

            },

            {

                name: "Abandoned Office",

                image: "assets/images/rooms/office.jpeg",

                mission: "Escape The Office"

            }

        ];

    },

    /* ======================================
       START GAME
    ====================================== */

    start() {

        this.started = true;

        this.gameOver = false;

        this.paused = false;

        this.currentRoom = 0;

        this.score = 0;

        this.level = 1;

        this.xp = 0;

        this.loadRoom();

    },

    /* ======================================
       LOAD ROOM
    ====================================== */

    loadRoom() {

        const room = this.rooms[this.currentRoom];

        if (!room) return;

        this.mission = room.mission;

        if (this.roomImage) {

            this.roomImage.src = room.image;

        }

        this.randomizeObjects();

        this.updateHUD();

        if (typeof PuzzleManager !== "undefined") {

            PuzzleManager.solvedInRoom = 0;

        }

        if (typeof GameState !== "undefined") {

            GameState.lost = false;

        }

        if (typeof Timer !== "undefined") {

            const duration = (typeof Settings !== "undefined")
                ? Settings.getTimerDuration()
                : 180;

            Timer.start(duration);

        }

        console.log("Loaded Room:", room.name);

    },

    /* ======================================
       RANDOM OBJECTS
    ====================================== */

    randomizeObjects() {

        const list = [

            this.key,

            this.note,

            this.keypad,

            this.door

        ];

        list.forEach(obj => {

            if (!obj) return;

            obj.style.display = "block";

            obj.classList.remove("itemFound");

            obj.style.left =
                (10 + Math.random() * 75) + "%";

            obj.style.top =
                (15 + Math.random() * 60) + "%";

        });

    },

    /* ======================================
       HUD
    ====================================== */

    updateHUD() {

        if (this.roomValue) {

            this.roomValue.textContent =

                (this.currentRoom + 1) +

                " / " +

                this.rooms.length;

        }

        if (this.scoreValue) {

            this.scoreValue.textContent =

                this.score;

        }

        if (this.levelValue) {

            this.levelValue.textContent =

                "Lv." +

                this.level;

        }

        if (this.missionText) {

            this.missionText.textContent =

                this.mission;

        }

        if (this.xpBar) {

            this.xpBar.style.width =

                this.xp + "%";

        }

        if (this.hintValue && typeof GameState !== "undefined") {

            this.hintValue.textContent =

                GameState.player.hints;

        }

    },

    /* ======================================
       HINT SYSTEM
    ====================================== */

    useHint() {

        if (typeof GameState === "undefined") return;

        if (GameState.player.hints <= 0) {

            if (typeof UI !== "undefined") {

                UI.message("🚫 No hints left!");

            }

            return;

        }

        GameState.player.hints--;

        GameState.player.hintsUsed =
            (GameState.player.hintsUsed || 0) + 1;

        this.updateHUD();

        // Figure out what the player still needs and point at it
        let target = null;
        let text = "🔍 Look around carefully...";

        if (!GameState.progress.hasKey && this.key &&
            this.key.style.display !== "none") {

            target = this.key;
            text = "💡 Hint: the Golden Key is glowing nearby.";

        } else if (!GameState.progress.hasNote && this.note &&
            this.note.style.display !== "none") {

            target = this.note;
            text = "💡 Hint: check near the Secret Note.";

        } else if (!GameState.progress.doorUnlocked && this.keypad) {

            target = this.keypad;
            text = "💡 Hint: the keypad puzzle holds the way out.";

        } else if (this.door) {

            target = this.door;
            text = "💡 Hint: the door is ready to be opened.";

        }

        if (target) {

            target.classList.add("hintGlow");

            setTimeout(() => {

                target.classList.remove("hintGlow");

            }, 3000);

        }

        if (typeof UI !== "undefined") {

            UI.message(text);

        }

        if (typeof AudioManager !== "undefined") {

            AudioManager.play("click");

        }

    },

    /* ======================================
       SCORE
    ====================================== */

    addScore(points) {

        this.score += points;

        this.updateHUD();

    },

    /* ======================================
       XP
    ====================================== */

    addXP(points) {

        this.xp += points;

        if (this.xp >= 100) {

            this.level++;

            this.xp = 0;

            if (typeof UI !== "undefined") {

                UI.message(

                    "⭐ Level Up!"

                );

            }

        }

        this.updateHUD();

    },

       /* ======================================
       OBJECT EVENTS
    ====================================== */

    bindObjects() {

        /* ===============================
           GOLDEN KEY
        =============================== */

        if (this.key) {

            this.key.onclick = () => {

                if (GameState.progress.hasKey)
                    return;

                GameState.progress.hasKey = true;

                this.key.classList.add("itemFound");

                this.key.style.pointerEvents = "none";

                if (typeof Inventory !== "undefined") {

                    Inventory.add("key");

                }

                this.addScore(100);

                this.addXP(20);

                if (typeof AudioManager !== "undefined") {

                    AudioManager.play("pickup");

                }

                if (typeof UI !== "undefined") {

                    UI.message("🔑 Golden Key Collected");

                }

            };

        }

        /* ===============================
           SECRET NOTE
        =============================== */

        if (this.note) {

            this.note.onclick = () => {

                if (GameState.progress.hasNote)
                    return;

                GameState.progress.hasNote = true;

                this.note.classList.add("itemFound");

                this.note.style.pointerEvents = "none";

                if (typeof Inventory !== "undefined") {

                    Inventory.add("note");

                }

                this.addScore(100);

                this.addXP(20);

                if (typeof AudioManager !== "undefined") {

                    AudioManager.play("pickup");

                }

                if (typeof UI !== "undefined") {

                    UI.message("📜 Secret Note Found");

                }

            };

        }

        /* ===============================
           KEYPAD
        =============================== */

        if (this.keypad) {

            this.keypad.onclick = () => {

                if (typeof AudioManager !== "undefined") {

                    AudioManager.play("click");

                }

                if (typeof PuzzleManager !== "undefined") {

                    PuzzleManager.open();

                } else if (typeof UI !== "undefined") {

                    UI.message("Puzzle system not loaded.");

                }

            };

        }

        /* ===============================
           EXIT DOOR
        =============================== */

        if (this.door) {

            this.door.onclick = () => {

                if (!GameState.progress.hasKey) {

                    if (typeof AudioManager !== "undefined") {

                        AudioManager.play("wrong");

                    }

                    if (typeof UI !== "undefined") {

                        UI.message("🔒 You need the Golden Key.");

                    }

                    this.door.classList.add("shake");

                    setTimeout(() => {

                        this.door.classList.remove("shake");

                    }, 500);

                    return;

                }

                if (!GameState.progress.doorUnlocked) {

                    if (typeof UI !== "undefined") {

                        UI.message("🧩 Solve the keypad puzzle first.");

                    }

                    if (typeof PuzzleManager !== "undefined") {

                        PuzzleManager.open();

                    }

                    return;

                }

                this.completeRoom();

            };

        }

    },

    /* ======================================
       COMPLETE ROOM
    ====================================== */

    completeRoom() {

        if (typeof AudioManager !== "undefined") {

            AudioManager.play("unlock");

        }

        this.addScore(500);

        this.addXP(50);

        if (typeof UI !== "undefined") {

            UI.message("✅ Room Cleared!");

        }

        if (this.currentRoom === 0 &&
            typeof Achievements !== "undefined") {

            Achievements.unlock("firstEscape");

        }

        if (typeof SaveManager !== "undefined") {

            SaveManager.save();

        }

        setTimeout(() => {

            this.nextRoom();

        }, 1200);

    },

    /* ======================================
       NEXT ROOM
    ====================================== */

    nextRoom() {

        this.currentRoom++;

        if (this.currentRoom >= this.rooms.length) {

            this.winGame();

            return;

        }

        GameState.progress.hasKey = false;

        GameState.progress.hasNote = false;

        GameState.progress.doorUnlocked = false;

        if (typeof Inventory !== "undefined") {

            Inventory.clear();

        }

        this.loadRoom();

    },

    /* ======================================
       RESET CURRENT ROOM
    ====================================== */

    resetRoom() {

        GameState.progress.hasKey = false;

        GameState.progress.hasNote = false;

        GameState.progress.doorUnlocked = false;

        if (typeof Inventory !== "undefined") {

            Inventory.clear();

        }

        this.randomizeObjects();

        this.updateHUD();

    },
       /* ======================================
       PLAYER XP & LEVEL
    ====================================== */

    checkLevel() {

        while (this.xp >= 100) {

            this.xp -= 100;

            this.level++;

            if (typeof AudioManager !== "undefined") {

                AudioManager.play("success");

            }

            if (typeof UI !== "undefined") {

                UI.message(
                    "🎉 Level " + this.level + " Reached!"
                );

            }

        }

        this.updateHUD();

    },

    /* ======================================
       UPDATE MISSION
    ====================================== */

    updateMission(text) {

        this.mission = text;

        if (this.missionText) {

            this.missionText.textContent = text;

        }

    },

    /* ======================================
       REFRESH HUD
    ====================================== */

    refreshHUD() {

        this.updateHUD();

        if (typeof HUD !== "undefined" &&
            HUD.update) {

            HUD.update();

        }

    },

    /* ======================================
       SAVE GAME
    ====================================== */

    saveGame() {

        if (typeof SaveManager !== "undefined") {

            SaveManager.save();

        }

    },

    /* ======================================
       LOAD GAME
    ====================================== */

    loadGame() {

        if (typeof SaveManager !== "undefined") {

            SaveManager.load();

        }

        this.refreshHUD();

    },

    /* ======================================
       AUTO SAVE
    ====================================== */

    autoSave() {

        if (!this.started)
            return;

        if (typeof SaveManager !== "undefined") {

            SaveManager.save();

        }

    },

    /* ======================================
       PLAYER STATS
    ====================================== */

    getStats() {

        return {

            score: this.score,

            xp: this.xp,

            level: this.level,

            room: this.currentRoom + 1,

            mission: this.mission,

            gameOver: this.gameOver,

            paused: this.paused

        };

    },

    /* ======================================
       PAUSE
    ====================================== */

    pause() {

        this.paused = true;

        if (typeof UI !== "undefined") {

            UI.message("⏸ Game Paused");

        }

    },

    /* ======================================
       RESUME
    ====================================== */

    resume() {

        this.paused = false;

        if (typeof UI !== "undefined") {

            UI.message("▶ Game Resumed");

        }

    },

    /* ======================================
       TOGGLE PAUSE
    ====================================== */

    togglePause() {

        if (this.paused) {

            this.resume();

        }

        else {

            this.pause();

        }

    },

    /* ======================================
       TIMER UPDATE
    ====================================== */

    updateTimer() {

        if (!this.started)
            return;

        if (this.paused)
            return;

        if (this.gameOver)
            return;

        if (typeof Timer !== "undefined" &&
            Timer.update) {

            Timer.update();

        }

    },

    /* ======================================
       ACHIEVEMENTS
    ====================================== */

    unlockAchievement(id) {

        if (typeof Achievements !== "undefined") {

            Achievements.unlock(id);

        }

    },

    /* ======================================
       PERIODIC SAVE
    ====================================== */

    startAutoSave() {

        setInterval(() => {

            this.autoSave();

        }, 30000);

    },
       /* ======================================
       WIN GAME
    ====================================== */

    winGame() {

        this.gameOver = true;

        this.started = false;

        if (typeof GameState !== "undefined") {

            GameState.won = true;

        }

        if (typeof stopTimer === "function") {

            stopTimer();

        }

        if (typeof AudioManager !== "undefined") {

            AudioManager.play("unlock");

        }

        document.getElementById("gameScreen")
            ?.classList.add("hidden");

        document.getElementById("winScreen")
            ?.classList.remove("hidden");

        const finalScore =

            this.score +

            (this.level * 500);

        const scoreText =

            document.getElementById("finalScore");

        if (scoreText) {

            scoreText.textContent =

                "Final Score : " +

                finalScore;

        }

        if (

            typeof Leaderboard !== "undefined" &&

            Leaderboard.add

        ) {

            Leaderboard.add(

                GameState.player?.name || "Player",

                finalScore,

                GameState.timer?.time || 0

            );

        }

        if (

            typeof Achievements !== "undefined"

        ) {

            Achievements.unlock("masterEscape");

            if ((GameState.player?.hintsUsed || 0) === 0) {

                Achievements.unlock("noHints");

            }

            if (typeof Timer !== "undefined" &&
                (GameState.timer?.time || 0) > Timer.totalTime * 0.5) {

                Achievements.unlock("fastEscape");

            }

            if ((GameState.player?.itemsCollected || 0) >= 6) {

                Achievements.unlock("collector");

            }

        }

        if (typeof Confetti !== "undefined") {

            Confetti.burst();

        }

        this.saveGame();

    },

    /* ======================================
       LOSE GAME
    ====================================== */

    loseGame() {

        this.gameOver = true;

        this.started = false;

        if (typeof stopTimer === "function") {

            stopTimer();

        }

        if (typeof AudioManager !== "undefined") {

            AudioManager.play("wrong");

        }

        document.getElementById("gameScreen")
            ?.classList.add("hidden");

        document.getElementById("loseScreen")
            ?.classList.remove("hidden");

    },

    /* ======================================
       TIMER CHECK
    ====================================== */

    checkTimer() {

        if (

            typeof GameState === "undefined"

        )

            return;

        if (GameState.lost || GameState.won)

            return;

        if (

            GameState.timer &&

            GameState.timer.time <= 0

        ) {

            GameState.lost = true;

            this.loseGame();

        }

    },

    /* ======================================
       RESTART
    ====================================== */

    restart() {

        if (

            typeof GameState !== "undefined" &&

            GameState.reset

        ) {

            GameState.reset();

        }

        location.reload();

    },

    /* ======================================
       PLAY AGAIN
    ====================================== */

    playAgain() {

        this.restart();

    },

    /* ======================================
       ROOM FADE
    ====================================== */

    fadeRoom() {

        const room =

            document.getElementById("room");

        if (!room)

            return;

        room.style.transition =

            "opacity .5s";

        room.style.opacity = 0;

        setTimeout(() => {

            room.style.opacity = 1;

        }, 500);

    },

    /* ======================================
       SHAKE ROOM
    ====================================== */

    shakeRoom() {

        const room =

            document.getElementById("room");

        if (!room)

            return;

        room.classList.add("shake");

        setTimeout(() => {

            room.classList.remove("shake");

        }, 500);

    },

    /* ======================================
       UPDATE LOOP
    ====================================== */

    update() {

        if (!this.started)

            return;

        if (this.paused)

            return;

        if (this.gameOver)

            return;

        this.checkTimer();

        this.refreshHUD();

    },
       /* ======================================
       KEYBOARD SHORTCUTS
    ====================================== */

    handleKeyPress(event) {

        if (event.key === "Escape") {

            if (typeof UI !== "undefined") {

                UI.hide("puzzleModal");

                UI.hide("settingsPanel");

                UI.hide("leaderboardScreen");

            }

        }

    }

};

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    Game.init();

    Game.startAutoSave();

    document.addEventListener("keydown", (event) => {

        Game.handleKeyPress(event);

    });

    const restartBtn = document.getElementById("restart");

    if (restartBtn) {

        restartBtn.onclick = () => {

            Game.restart();

        };

    }

    const playAgainBtn = document.getElementById("playAgain");

    if (playAgainBtn) {

        playAgainBtn.onclick = () => {

            Game.playAgain();

        };

    }

});

/* ==========================================
   GAME LOOP
========================================== */

setInterval(() => {

    Game.update();

}, 100);

/* ==========================================
   GLOBAL EXPORT
========================================== */

window.Game = Game;

console.log("====================================");
console.log("Escape Room Game Loaded Successfully");
console.log("Version : Phase 2 Final");
console.log("====================================");
