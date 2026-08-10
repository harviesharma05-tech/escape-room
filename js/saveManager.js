/* ==========================================
   ESCAPE ROOM - SAVEMANAGER.JS
========================================== */

const SaveManager = {

    saveKey: "escape_room_save",

    // ==================================
    // SAVE GAME
    // ==================================

    save() {

        const data = {

            gameState: GameState,

            inventory: Inventory.items,

            room: RoomGenerator.currentRoom,

            timer: Timer.currentTime,

            settings: Settings.data

        };

        localStorage.setItem(

            this.saveKey,

            JSON.stringify(data)

        );

        console.log("Game Saved");

        showMessage("💾 Game Saved");

    },

    // ==================================
    // LOAD GAME
    // ==================================

    load() {

        const save =

            localStorage.getItem(this.saveKey);

        if (!save)
            return false;

        const data = JSON.parse(save);

        // Restore GameState
        Object.assign(GameState, data.gameState);

        // Restore Inventory
        Inventory.items = data.inventory || [];
        Inventory.render();

        // Restore Room
        RoomGenerator.currentRoom = data.room;
        RoomGenerator.load();

        // Restore Timer
        Timer.currentTime = data.timer;
        Timer.update();

        // Restore Settings
        if (data.settings) {

            Settings.data = data.settings;
            Settings.apply();

        }

        HUD.update();

        console.log("Game Loaded");

        showMessage("📂 Save Loaded");

        return true;

    },

    // ==================================
    // DELETE SAVE
    // ==================================

    clear() {

        localStorage.removeItem(this.saveKey);

        console.log("Save Deleted");

        showMessage("🗑 Save Deleted");

    },

    // ==================================
    // AUTO SAVE
    // ==================================

    autoSave() {

        setInterval(() => {

            if (GameState.started && !GameState.won) {

                this.save();

            }

        }, 30000); // Every 30 seconds

    }

};

// ==================================
// START AUTO SAVE
// ==================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SaveManager.autoSave();

    }

);

console.log("saveManager.js Loaded Successfully");
