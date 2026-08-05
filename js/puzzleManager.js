/* ==========================================
   ESCAPE ROOM - PUZZLE MANAGER
========================================== */

const PuzzleManager = {

    currentPuzzle: null,

    puzzles: [

        {
            id: 1,
            type: "keypad",
            title: "Security Door",
            question: "Reverse the number 4213",
            answer: "3124",
            reward: "door"
        },

        {
            id: 2,
            type: "riddle",
            title: "Riddle",

            question:
            "The more you take, the more you leave behind. What am I?",

            answer: "footsteps",
            reward: "key"
        },

        {
            id: 3,
            type: "math",
            title: "Math Lock",

            question:
            "15 × 4 + 10 = ?",

            answer: "70",

            reward: "battery"

        },

        {
            id: 4,
            type: "cipher",

            title: "Cipher",

            question:
            "Decode: KHOOR",

            answer: "hello",

            reward: "note"

        }

    ],

    //---------------------------------

    random(){

        const index = Math.floor(

            Math.random() *

            this.puzzles.length

        );

        this.currentPuzzle =

            this.puzzles[index];

        return this.currentPuzzle;

    },

    //---------------------------------

    open(){

        const puzzle = this.random();

        document
        .getElementById("puzzleModal")
        .classList.remove("hidden");

        document
        .getElementById("puzzleTitle")
        .innerHTML = puzzle.title;

        document
        .getElementById("puzzleBody")
        .innerHTML =

        `
        <p style="margin-bottom:20px">

            ${puzzle.question}

        </p>

        <input
            id="answerInput"
            placeholder="Your Answer">
        `;

    },

    //---------------------------------

    check(){

        const input =

        document
        .getElementById("answerInput");

        if(!input) return;

        const value =

        input.value

        .trim()

        .toLowerCase();

        if(

            value===

            this.currentPuzzle.answer

        ){

            this.success();

        }

        else{

            this.fail();

        }

    },

    //---------------------------------

    success(){

        alert("Puzzle Solved!");

        switch(

            this.currentPuzzle.reward

        ){

            case "key":

                addItem("key");

            break;

            case "battery":

                addItem("battery");

            break;

            case "note":

                addItem("note");

            break;

            case "door":

                document
                .getElementById("objDoor")
                .dataset.open="true";

            break;

        }

        document
        .getElementById("puzzleModal")
        .classList.add("hidden");

    },

    //---------------------------------

    fail(){

        alert("Wrong Answer!");

    }

};

//===============================

document

.getElementById("submitPuzzle")

.addEventListener(

"click",

()=>{

PuzzleManager.check();

});
