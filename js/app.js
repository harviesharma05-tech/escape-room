/* ==========================================
   ESCAPE ROOM - APP.JS
========================================== */


const App = {



started:false,




// ==================================
// INITIALIZE
// ==================================


init(){


console.log(
"Escape Room Loading..."
);



this.bindEvents();



this.showLoading();



},





// ==================================
// LOADING SCREEN
// ==================================


showLoading(){



const loading=

document.getElementById(
"loadingScreen"
);



setTimeout(()=>{



if(loading)

loading.classList.add(
"hidden"
);




const menu=

document.getElementById(
"mainMenu"
);



if(menu)

menu.classList.remove(
"hidden"
);



},2000);



},






// ==================================
// EVENTS
// ==================================


bindEvents(){



const start=

document.getElementById(
"startBtn"
);



if(start){



start.onclick=()=>{


this.startGame();


};



}






const continueBtn=

document.getElementById(
"continueBtn"
);



if(continueBtn){



continueBtn.onclick=()=>{


this.continueGame();



};



}






const leaderboardBtn=

document.getElementById(
"leaderboardBtn"
);



if(leaderboardBtn){



leaderboardBtn.onclick=()=>{


this.openLeaderboard();


};



}






const settingsBtn=

document.getElementById(
"settingsBtn"
);



if(settingsBtn){



settingsBtn.onclick=()=>{


this.openSettings();


};



}




},






// ==================================
// START NEW GAME
// ==================================


startGame(){



console.log(
"Starting New Game"
);



GameState.reset();



GameState.started=true;



this.started=true;



this.openGame();



RoomGenerator.generate();



startTimer();



AudioManager.playMusic();



},






// ==================================
// CONTINUE GAME
// ==================================


continueGame(){



const loaded=

SaveManager.load();




if(!loaded){


showMessage(
"No Save Found",
"error"
);


return;


}




GameState.started=true;



this.started=true;



this.openGame();



startTimer();



},






// ==================================
// OPEN GAME SCREEN
// ==================================


openGame(){



document
.getElementById(
"mainMenu"
)
.classList.add(
"hidden"
);




document
.getElementById(
"room"
)
.classList.remove(
"hidden"
);




document
.getElementById(
"hud"
)
.classList.remove(
"hidden"
);




document
.getElementById(
"inventory"
)
.classList.remove(
"hidden"
);



},







// ==================================
// LEADERBOARD
// ==================================


openLeaderboard(){



const screen=

document.getElementById(
"leaderboardScreen"
);



if(screen)

screen.classList.remove(
"hidden"
);



const body=

document.getElementById(
"leaderboardBody"
);



if(!body)
return;



body.innerHTML="";



Leaderboard.get()
.forEach(

(score,index)=>{



body.innerHTML+=`

<tr>

<td>
${index+1}
</td>


<td>
${score.name}
</td>


<td>
${score.score}
</td>


<td>
${score.time}
</td>


</tr>

`;



}



);



},






// ==================================
// SETTINGS
// ==================================


openSettings(){



const panel=

document.getElementById(
"settingsPanel"
);



if(panel)

panel.classList.remove(
"hidden"
);



},




};






// ==================================
// CLOSE BUTTONS
// ==================================


document.addEventListener(
"DOMContentLoaded",

()=>{



App.init();




const closeLeaderboard=

document.getElementById(
"closeLeaderboard"
);



if(closeLeaderboard){


closeLeaderboard.onclick=()=>{


document
.getElementById(
"leaderboardScreen"
)
.classList.add(
"hidden"
);



};



}






const closeSettings=

document.getElementById(
"closeSettings"
);



if(closeSettings){



closeSettings.onclick=()=>{


document
.getElementById(
"settingsPanel"
)
.classList.add(
"hidden"
);



};



}




});
