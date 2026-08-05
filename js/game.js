// ===============================
// ESCAPE ROOM - GAME ENGINE
// ===============================

let gameStarted = false;
let hasKey = false;
let hasNote = false;
let gameWon = false;

const startBtn = document.getElementById("startBtn");
const loadingScreen = document.getElementById("loadingScreen");
const menu = document.getElementById("mainMenu");
const room = document.getElementById("room");
const hud = document.getElementById("hud");
const inventory = document.getElementById("inventory");

const key = document.getElementById("objKey");
const note = document.getElementById("objNote");
const keypad = document.getElementById("objKeypad");
const door = document.getElementById("objDoor");

const puzzleModal = document.getElementById("puzzleModal");
const puzzleTitle = document.getElementById("puzzleTitle");
const puzzleBody = document.getElementById("puzzleBody");

const winScreen = document.getElementById("winScreen");
const finalScore = document.getElementById("finalScore");

// ----------------------------
// Loading Screen
// ----------------------------

window.onload = () => {

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        menu.classList.remove("hidden");

    },2000);

};

// ----------------------------
// Start Game
// ----------------------------

startBtn.onclick = () => {

    gameStarted = true;

    menu.classList.add("hidden");

    room.classList.remove("hidden");
    hud.classList.remove("hidden");
    inventory.classList.remove("hidden");

    console.log("Game Started");

};

// ----------------------------
// Pick Key
// ----------------------------

key.onclick = () => {

    if(hasKey) return;

    hasKey = true;

    key.classList.add("found");

    addInventory("🔑");

    alert("You picked up a Key!");

};

// ----------------------------
// Read Note
// ----------------------------

note.onclick = () => {

    if(hasNote) return;

    hasNote = true;

    note.classList.add("found");

    puzzleModal.classList.remove("hidden");

    puzzleTitle.innerText = "Secret Note";

    puzzleBody.innerHTML = `
        <h3>
            Door Password Hint
        </h3>

        <p>

        Reverse of

        <b>4213</b>

        </p>
    `;

};

// ----------------------------
// Close Popup
// ----------------------------

document.getElementById("closePuzzle").onclick = () => {

    puzzleModal.classList.add("hidden");

};

// ----------------------------
// Keypad
// ----------------------------

keypad.onclick = () => {

    puzzleModal.classList.remove("hidden");

    puzzleTitle.innerText = "Door Keypad";

    puzzleBody.innerHTML = `

        <input
        id="passwordInput"
        placeholder="Enter Password"
        style="
        width:100%;
        padding:15px;
        font-size:20px;
        ">
    `;

};

// ----------------------------
// Submit Password
// ----------------------------

document.getElementById("submitPuzzle").onclick = () => {

    const input = document.getElementById("passwordInput");

    if(!input) return;

    if(input.value==="3124"){

        alert("Correct Password!");

        puzzleModal.classList.add("hidden");

        door.classList.add("unlocked");

        door.dataset.open="true";

    }

    else{

        alert("Wrong Password");

    }

};

// ----------------------------
// Door
// ----------------------------

door.onclick = ()=>{

    if(!hasKey){

        alert("Door is Locked.\nFind the Key.");

        return;

    }

    if(door.dataset.open!=="true"){

        alert("Door requires Password.");

        return;

    }

    if(gameWon) return;

    gameWon=true;

    room.classList.add("hidden");

    hud.classList.add("hidden");

    inventory.classList.add("hidden");

    winScreen.classList.remove("hidden");

    finalScore.innerHTML="Score : 100";

};

// ----------------------------
// Inventory
// ----------------------------

function addInventory(item){

    const div=document.createElement("div");

    div.className="item";

    div.innerHTML=item;

    document
    .getElementById("inventoryItems")
    .appendChild(div);

}
