/* ==========================================
   ESCAPE ROOM - LEADERBOARD.JS
========================================== */

const Leaderboard = {

    storageKey: "escape_room_leaderboard",

    scores: [],

    // ==================================
    // INITIALIZE
    // ==================================

    init() {

        this.load();

    },

    // ==================================
    // LOAD
    // ==================================

    load() {

        const data = localStorage.getItem(this.storageKey);

        if (data) {

            this.scores = JSON.parse(data);

        } else {

            this.scores = [];

        }

    },

    // ==================================
    // SAVE
    // ==================================

    save() {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.scores)

        );

    },

    // ==================================
    // ADD NEW SCORE
    // ==================================

    add(name, score, time) {

        if (!name || name.trim() === "") {

            name = "Player";

        }

        this.scores.push({

            name: name,

            score: score,

            time: formatTime(time),

            date: new Date().toLocaleDateString()

        });

        this.sort();

        this.save();

        this.render();

    },

    // ==================================
    // SORT
    // ==================================

    sort() {

        this.scores.sort((a, b) => {

            return b.score - a.score;

        });

        this.scores = this.scores.slice(0, 10);

    },

    // ==================================
    // GET
    // ==================================

    get() {

        return this.scores;

    },

    // ==================================
    // CLEAR
    // ==================================

    clear() {

        if (!confirm("Delete all leaderboard scores?"))

            return;

        this.scores = [];

        this.save();

        this.render();

        showMessage("Leaderboard Cleared");

    },

    // ==================================
    // RENDER
    // ==================================

    render() {

        const body = document.getElementById("leaderboardBody");

        if (!body) return;

        body.innerHTML = "";

        if (this.scores.length === 0) {

            body.innerHTML = `

            <tr>

                <td colspan="5">

                    No Scores Yet

                </td>

            </tr>

            `;

            return;

        }

        this.scores.forEach((player, index) => {

            let medal = "";

            if (index === 0)

                medal = "🥇";

            else if (index === 1)

                medal = "🥈";

            else if (index === 2)

                medal = "🥉";

            body.innerHTML += `

            <tr>

                <td>

                    ${medal} ${index + 1}

                </td>

                <td>

                    ${player.name}

                </td>

                <td>

                    ${player.score}

                </td>

                <td>

                    ${player.time}

                </td>

                <td>

                    ${player.date}

                </td>

            </tr>

            `;

        });

    },

    // ==================================
    // IS HIGH SCORE
    // ==================================

    isHighScore(score) {

        if (this.scores.length < 10)

            return true;

        return score > this.scores[this.scores.length - 1].score;

    }

};

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Leaderboard.init();

        Leaderboard.render();

    }

);

console.log("leaderboard.js Loaded Successfully");
