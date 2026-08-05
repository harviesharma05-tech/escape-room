/* ==========================================
   ESCAPE ROOM - SAVE MANAGER
========================================== */


const SaveManager = {


    key:"EscapeRoom_Save",



    // ==================================
    // SAVE GAME
    // ==================================

    save(){


        const data = {


            gameState:{

                started:GameState.started,

                won:GameState.won,


                player:

                GameState.player,


                progress:

                GameState.progress,


                timer:

                GameState.timer,


                room:

                GameState.room,


                puzzle:

                GameState.puzzle

            },


            inventory:

            Inventory.items,



            room:

            RoomGenerator.currentRoom



        };





        localStorage.setItem(

            this.key,

            JSON.stringify(data)

        );



        console.log(
            "Game Saved"
        );



    },






    // ==================================
    // LOAD GAME
    // ==================================

    load(){



        const saved =

        localStorage.getItem(

            this.key

        );




        if(!saved){


            console.log(
                "No Save Found"
            );


            return false;


        }




        const data =

        JSON.parse(saved);





        // Restore GameState

        Object.assign(

            GameState,

            data.gameState

        );






        // Restore Inventory


        if(data.inventory){


            Inventory.load(

                data.inventory

            );


        }






        // Restore Room


        if(data.room){


            RoomGenerator.currentRoom=

            data.room;



            RoomGenerator.load();


        }







        // Restore Timer


        updateTimer();





        console.log(

            "Game Loaded"

        );



        return true;



    },






    // ==================================
    // CHECK SAVE EXISTS
    // ==================================

    exists(){


        return localStorage.getItem(

            this.key

        ) !== null;



    },







    // ==================================
    // DELETE SAVE
    // ==================================

    clear(){



        localStorage.removeItem(

            this.key

        );



        console.log(

            "Save Deleted"

        );



    },







    // ==================================
    // EXPORT SAVE
    // ==================================

    export(){


        return localStorage.getItem(

            this.key

        );


    },







    // ==================================
    // IMPORT SAVE
    // ==================================

    import(data){


        localStorage.setItem(

            this.key,

            data

        );


    }



};







// ==================================
// AUTO SAVE EVERY 30 SEC
// ==================================


setInterval(()=>{



if(

GameState &&

GameState.started &&

!GameState.won

){


SaveManager.save();



}



},30000);
