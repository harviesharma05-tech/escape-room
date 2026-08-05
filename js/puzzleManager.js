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

            reward:"door"

        },



        {
            id:2,

            type:"riddle",

            title:"Ancient Riddle",

            question:
            "The more you take, the more you leave behind. What am I?",

            answer:"footsteps",

            reward:"key"

        },



        {
            id:3,

            type:"math",

            title:"Math Lock",

            question:
            "25 × 4 + 20 = ?",

            answer:"120",

            reward:"battery"

        },



        {
            id:4,

            type:"cipher",

            title:"Secret Message",

            question:
            "Decode: KHOOR",

            answer:"hello",

            reward:"note"

        }



    ],




    // ==============================
    // Generate Puzzle
    // ==============================


    generate(){


        let index = random(

            0,

            this.puzzles.length-1

        );


        this.currentPuzzle =

        this.puzzles[index];


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
