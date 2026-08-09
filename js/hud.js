/* ==========================================
   ESCAPE ROOM - HUD.JS

   Note: Game.updateHUD() is the single source
   of truth for HUD rendering (score, level,
   xp, room, mission, time, hints). This module
   is kept as a thin delegate for backward
   compatibility with code that calls HUD.update().
========================================== */

const HUD = {

    init() {

        this.update();

    },

    update() {

        if (typeof Game !== "undefined" && Game.updateHUD) {

            Game.updateHUD();

        }

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        HUD.init();

    }

);
