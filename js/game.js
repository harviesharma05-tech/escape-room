/* ==========================================
   ESCAPE ROOM - GAME.JS
========================================== */


document.addEventListener("DOMContentLoaded",()=>{


const key =
document.getElementById("objKey");


const note =
document.getElementById("objNote");


const keypad =
document.getElementById("objKeypad");


const door =
document.getElementById("objDoor");




// ===============================
// PICKUP KEY
// ===============================


if(key){

key.onclick=()=>{


    if(GameState.progress.hasKey)
        return;



    GameState.progress.hasKey=true;


    addItem("key");



    key.classList.add("itemFound");



    AudioManager.play("pickup");



    showMessage(
        "🔑 Golden Key Found!"
    );


};

}



// ===============================
// PICKUP NOTE
// ===============================


if(note){

note.onclick=()=>{


    if(GameState.progress.hasNote)
        return;



    GameState.progress.hasNote=true;



    addItem("note");



    note.classList.add("itemFound");



    AudioManager.play("pickup");



    showMessage(
        "📜 Secret Note Collected"
    );



};

}




// ===============================
// KEYPAD
// ===============================


if(keypad){


keypad.onclick=()=>{


    PuzzleManager.open();



    AudioManager.play("click");


};


}




// ===============================
// DOOR
// ===============================


if(door){


door.onclick=()=>{



    if(!GameState.progress.hasKey){


        showMessage(
            "🔒 Need a key!"
        );


        door.classList.add("shake");


        return;

    }




    if(!GameState.progress.doorUnlocked){



        showMessage(
            "🔢 Solve the puzzle first"
        );


        PuzzleManager.open();


        return;


    }




    escape();



};



}





// ===============================
// ESCAPE
// ===============================


function escape(){


if(GameState.won)
return;



GameState.won=true;



stopTimer();



let score =

1000 +

getTimeBonus();



GameState.player.score=

score;



Achievements.unlock(
"firstEscape"
);



Leaderboard.add(

GameState.player.name,

score,

GameState.timer.time

);




document
.getElementById("room")
.classList.add("hidden");



document
.getElementById("hud")
.classList.add("hidden");



document
.getElementById("inventory")
.classList.add("hidden");



document
.getElementById("winScreen")
.classList.remove("hidden");




document
.getElementById("finalScore")
.innerHTML=

"Final Score : "+score;



AudioManager.play("unlock");



}




// ===============================
// RESTART
// ===============================


const restart =
document.getElementById("restart");


if(restart){


restart.onclick=()=>{


GameState.reset();


location.reload();


};


}




const playAgain =
document.getElementById("playAgain");


if(playAgain){


playAgain.onclick=()=>{


GameState.reset();


location.reload();


};


}



});
