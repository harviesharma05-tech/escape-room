/* ==========================================
   ESCAPE ROOM - PUZZLE MANAGER
========================================== */


const PuzzleManager = {


    currentPuzzle:null,

    solvedIds:[],

    solvedInRoom:0,

    puzzlesPerRoom:3,



    puzzles:[


        {
            id:1,

            type:"code",

            title:"Security Lock",

            question:
            "The password is a 2-digit number. It is even, and it is bigger than 90.",

            answer:"92",

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
            "5 + 5 x 2 = ?",

            answer:"15",

            reward:"battery",

            room:2

        },



        {
            id:4,

            type:"cipher",

            title:"Secret Message",

            question:
            "Unscramble the letters: OLLEH",

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
            "What is 10 + 5?",

            answer:"15",

            reward:"battery",

            room:0

        },



        {
            id:7,

            type:"code",

            title:"Vault Code",

            question:
            "Enter the year World War 2 ended.",

            answer:"1945",

            reward:"door",

            room:1

        },



        {
            id:8,

            type:"riddle",

            title:"Old Manuscript",

            question:
            "This room is full of books. What do you call a place full of books?",

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
            "Enter the number that comes after 99.",

            answer:"100",

            reward:"door",

            room:2

        },



        {
            id:11,

            type:"math",

            title:"Office Calculation",

            question:
            "There are 3 desks. Each desk has 2 drawers. How many drawers in total?",

            answer:"6",

            reward:"battery",

            room:3

        },



        {
            id:12,

            type:"riddle",

            title:"Exit Memo",

            question:
            "What do you call the thing you open to leave a room?",

            answer:"door",

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

            p => p.room === roomIndex &&

            !this.solvedIds.includes(p.id)

        );

        if (roomPuzzles.length === 0) {

            roomPuzzles = this.puzzles.filter(

                p => p.room === roomIndex

            );

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

        const answerInput = document.getElementById("answerInput");

        if (answerInput) {

            answerInput.focus();

            answerInput.onkeydown = (e) => {

                if (e.key === "Enter") {

                    PuzzleManager.check();

                }

            };

        }

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



        if (!this.solvedIds.includes(this.currentPuzzle.id)) {

            this.solvedIds.push(this.currentPuzzle.id);

        }

        this.solvedInRoom++;



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


        if (this.solvedInRoom >= this.puzzlesPerRoom) {

            if (typeof UI !== "undefined") {

                UI.message("🚪 All puzzles solved! Moving to next room...");

            }

            setTimeout(() => {

                if (typeof Game !== "undefined" && Game.completeRoom) {

                    Game.completeRoom();

                }

            }, 1200);

        } else {

            if (typeof UI !== "undefined") {

                UI.message(

                    `Puzzle ${this.solvedInRoom} of ${this.puzzlesPerRoom} solved for this room`

                );

            }

        }



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
