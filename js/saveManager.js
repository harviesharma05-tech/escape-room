/* ==========================================
   ESCAPE ROOM - SAVE MANAGER
========================================== */


const SaveManager={


key:"EscapeRoom_Save",



save(){


    const data={


        state:GameState,


        inventory:Inventory.items,


        room:RoomGenerator.currentRoom



    };



    localStorage.setItem(

        this.key,

        JSON.stringify(data)

    );


    console.log("Saved");

},




load(){



    const save=

    localStorage.getItem(this.key);



    if(!save)

        return false;



    const data=

    JSON.parse(save);




    Object.assign(

        GameState,

        data.state

    );



    Inventory.load(

        data.inventory

    );



    RoomGenerator.currentRoom=

    data.room;



    if(RoomGenerator.currentRoom)

        RoomGenerator.load();




    updateTimer();



    console.log("Loaded");


    return true;



},




clear(){


    localStorage.removeItem(

        this.key

    );


}



};




// Auto Save

setInterval(()=>{


    if(GameState.started){


        SaveManager.save();


    }



},30000);
