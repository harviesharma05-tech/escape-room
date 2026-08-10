/* ==========================================
   ESCAPE ROOM - PUZZLE MANAGER
========================================== */


const PuzzleManager = {


    currentPuzzle:null,



    puzzles:[


        {
            id:1,

            type:"code",

            title:"Security Lock",

            question:
            "Enter the reverse code of 4213",

            answer:"3124",

            reward:"door",

            room:0

        },



        {
            id:2,

            type:"riddle",

            title:"Ancient Riddle",

            question:
            "The more you take, the more you leave behind. What am I?",

            answer:"footsteps",

            reward:"key",

            room:1

        },



        {
            id:3,

            type:"math",

            title:"Math Lock",

            question:
            "25 × 4 + 20 = ?",

            answer:"120",

            reward:"battery",

            room:2

        },



        {
            id:4,

            type:"cipher",

            title:"Secret Message",

            question:
            "Decode: KHOOR",

            answer:"hello",

            reward:"note",

            room:3

        },



        {
            id:5,

            type:"riddle",

            title:"Lab Riddle",

            question:
            "I have keys but no locks, space but no room. You can enter but not go inside. What am I?",

            answer:"keyboard",

            reward:"key",

            room:0

        },



        {
            id:6,

            type:"math",

            title:"Chemical Ratio",

            question:
            "A formula needs 3 parts water for every 1 part acid. If you use 15 units of water, how many units of acid?",

            answer:"5",

            reward:"battery",

            room:0

        },



        {
            id:7,

            type:"code",

            title:"Vault Code",

            question:
            "The vault code is the year World War 2 ended. Enter it.",

            answer:"1945",

            reward:"door",

            room:1

        },



        {
            id:8,

            type:"cipher",

            title:"Old Manuscript",

            question:
            "Decode this Caesar cipher (shift 3): OLEUDUB",

            answer:"library",

            reward:"note",

            room:1

        },



        {
            id:9,

            type:"riddle",

            title:"Bunker Riddle",

            question:
            "I am not alive, but I grow. I don't have lungs, but I need air. What am I?",

            answer:"fire",

            reward:"key",

            room:2

        },



        {
            id:10,

            type:"code",

            title:"Bunker Access Code",

            question:
            "Enter the code: sum of digits of 987654 repeated twice (e.g. if sum is 12, enter 1212)",

            answer:"3939",

            reward:"door",

            room:2

        },



        {
            id:11,

            type:"math",

            title:"Office Calculation",

            question:
            "There are 12 desks. Each desk has 3 drawers. How many drawers in total?",

            answer:"36",

            reward:"battery",

            room:3

        },



        {
            id:12,

            type:"cipher",

            title:"Exit Memo",

            question:
            "Decode: XLI HSSV MW STIR (Atbash cipher)",

            answer:"the door is open",

            reward:"door",

            room:3

        }



    ],




    // ==============================
    // Generate Puzzle
    // ==============================


    generate(){


        let roomIndex = 0;

        if (typeof Game !== "undefined" &&
            typeof Game.currentRoom === "number") {

            roomIndex = Game.currentRoom;

        }

        let roomPuzzles = this.puzzles.filter(

            p => p.room === roomIndex

        );

        if (roomPuzzles.length === 0) {

            roomPuzzles = this.puzzles;

        }

        let index = random(

            0,

            roomPuzzles.length-1

        );


        this.currentPuzzle =

        roomPuzzles[index];


        return this.currentPuzzle;


    },





    // ==============================
    // Open Puzzle
    // ==============================


    open(){


        this.generate();



        let modal=

        document.getElementById(
            "puzzleModal"
        );



        let title=

        document.getElementById(
            "puzzleTitle"
        );



        let body=

        document.getElementById(
            "puzzleBody"
        );




        title.innerHTML=

        this.currentPuzzle.title;



        body.innerHTML=

        `

        <p>

        ${this.currentPuzzle.question}

        </p>


        <input

        id="answerInput"

        placeholder="Enter answer"

        >

        `;



        modal.classList.remove(
            "hidden"
        );



    },





    // ==============================
    // Check Answer
    // ==============================


    check(){


        const input=

        document.getElementById(
            "answerInput"
        );



        if(!input)
        return;




        let answer=

        input.value

        .trim()

        .toLowerCase();





        if(

        answer ===

        this.currentPuzzle.answer

        ){


            this.success();



        }

        else{


            this.fail();


        }


    },





    // ==============================
    // Success
    // ==============================


    success(){



        showMessage(
            "✅ Puzzle Solved!"
        );



        AudioManager.play(
            "success"
        );




        GameState.player.score +=100;



        GameState.player.xp +=25;



        switch(

        this.currentPuzzle.reward

        ){


            case "door":


                GameState.progress
                .doorUnlocked=true;


                break;




            case "key":


                addItem(
                    "key"
                );


                break;



            case "note":


                addItem(
                    "note"
                );


                break;



            case "battery":


                addItem(
                    "battery"
                );


                break;



        }




        document
        .getElementById(
            "puzzleModal"
        )
        .classList.add(
            "hidden"
        );



    },





    // ==============================
    // Failed
    // ==============================


    fail(){


        AudioManager.play(
            "wrong"
        );


        showMessage(
            "❌ Wrong Answer",
            "error"
        );


    }





};





// ==============================
// Submit Button
// ==============================


document.addEventListener(
"DOMContentLoaded",

()=>{


const button=

document.getElementById(
"submitPuzzle"
);



if(button){


button.onclick=()=>{


PuzzleManager.check();


};


}




});
