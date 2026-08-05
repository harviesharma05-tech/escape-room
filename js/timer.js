/* ==========================================
   ESCAPE ROOM - TIMER.JS
========================================== */


let timerInterval = null;


function startTimer(){


    if(timerInterval) return;


    timerInterval = setInterval(()=>{


        if(GameState.timer.paused)
            return;



        if(GameState.timer.time <= 0){

            gameOver();

            return;

        }



        GameState.timer.time--;


        updateTimer();



        if(GameState.timer.time <= 60){

            const timer = document.getElementById("timer");

            if(timer){

                timer.classList.add("blink");

            }

        }



    },1000);


}



function updateTimer(){


    const timer = document.getElementById("timer");


    if(!timer)
        return;



    let minutes = Math.floor(

        GameState.timer.time / 60

    );


    let seconds =

        GameState.timer.time % 60;



    timer.innerHTML =

    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;


}




function pauseTimer(){

    GameState.timer.paused=true;

}



function resumeTimer(){

    GameState.timer.paused=false;

}



function stopTimer(){


    clearInterval(timerInterval);


    timerInterval=null;


}



function getTimeBonus(){

    return GameState.timer.time;

}



function gameOver(){


    stopTimer();


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
    .getElementById("gameOver")
    .classList.remove("hidden");


}
