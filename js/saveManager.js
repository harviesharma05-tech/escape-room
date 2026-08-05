/* ==========================================
   ESCAPE ROOM - SAVEMANAGER.JS
========================================== */

const SaveManager = {

    saveKey: "EscapeRoom_Save",

    // ==========================
    // Save Game
    // ==========================

    save() {

        const data = {

            time: totalTime,

            inventory: Inventory.items,

            currentRoom: RoomGenerator.currentRoom,

            puzzle: PuzzleManager.currentPuzzle,

            hasKey: hasKey,

            hasNote: hasNote,

            gameWon: gameWon

        };

        localStorage.setItem(

            this.saveKey,

            JSON.stringify(data)

        );

        console.log("Game Saved");

    },

    // ==========================
    // Load Game
    // ==========================

    load() {

        const save = localStorage.getItem(this.saveKey);

        if (!save) {

            console.log("No Save Found");

            return false;

        }

        const data = JSON.parse(save);

        // Restore Timer
        totalTime = data.time;

        if (typeof updateTimer === "function") {

            updateTimer();

        }

        // Restore Inventory
        Inventory.items = data.inventory || [];
        Inventory.render();

        // Restore Room
        RoomGenerator.currentRoom = data.currentRoom;

        if (RoomGenerator.currentRoom) {

            RoomGenerator.load();

        }

        // Restore Puzzle
        PuzzleManager.currentPuzzle = data.puzzle;

        // Restore Game State
       progress: GameState.progress,

       player: GameState.player,

      timer: GameState.timer,

      inventory: GameState.inventory

        console.log("Game Loaded");

        return true;

    },

    // ==========================
    // Delete Save
    // ==========================

    clear() {

        localStorage.removeItem(this.saveKey);

        console.log("Save Deleted");

    }

};

/* ==========================================
   AUTO SAVE
========================================== */

setInterval(() => {

    if (typeof Game !== "undefined" && Game.started) {

        SaveManager.save();

    }

}, 30000); // Save every 30 seconds
