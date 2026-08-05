/* ==========================================
   ESCAPE ROOM - ROOM GENERATOR
========================================== */


const RoomGenerator = {



rooms:[


{
    id:1,

    name:"Secret Laboratory",

    image:
    "assets/images/rooms/lab.jpg",

    difficulty:"easy"

},



{
    id:2,

    name:"Haunted Library",

    image:
    "assets/images/rooms/library.jpg",

    difficulty:"medium"

},



{
    id:3,

    name:"Cyber Bunker",

    image:
    "assets/images/rooms/bunker.jpg",

    difficulty:"hard"

}



],




currentRoom:null,





objects:[

"objKey",

"objNote",

"objKeypad",

"objDoor"

],






// ==================================
// Generate Room
// ==================================


generate(){



let difficulty =

Settings.data.difficulty;



let available =

this.rooms;



if(difficulty==="easy"){


available=

this.rooms.filter(

room=>room.difficulty==="easy"

);


}




if(difficulty==="hard"){


available=

this.rooms.filter(

room=>room.difficulty!=="easy"

);


}




let index=

random(

0,

available.length-1

);




this.currentRoom=

available[index];




GameState.room=

this.currentRoom;




this.load();






},






// ==================================
// Load Room
// ==================================


load(){



if(!this.currentRoom)

return;




let image=

document.getElementById(
"roomImage"
);



if(image){


image.src=

this.currentRoom.image;


}





this.placeObjects();




console.log(

"Room:",
this.currentRoom.name

);



},






// ==================================
// Place Objects Randomly
// ==================================


placeObjects(){



this.objects.forEach(

id=>{


let element=

document.getElementById(id);



if(!element)

return;




let position=

this.randomPosition();




element.style.left=

position.x;



element.style.top=

position.y;



element.style.display=

"block";



}


);



},






// ==================================
// Random Position
// ==================================


randomPosition(){



return{


x:

random(

10,

85

)+"%",



y:

random(

15,

75

)+"%"


};



},






// ==================================
// Reset Room
// ==================================


reset(){


this.currentRoom=null;


GameState.room=null;


}




};
