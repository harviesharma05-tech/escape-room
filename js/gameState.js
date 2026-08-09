/* ==========================================
   ESCAPE ROOM - GAME STATE
========================================== */


const GameState = {


    started:false,


    won:false,


    player:{

        name:"Player",

        score:0,

        level:1,

        xp:0,

        hints:3,

        hintsUsed:0,

        itemsCollected:0

    },


    inventory:[],


    room:null,


    puzzle:null,


    timer:{

        time:900,

        paused:false

    },


    progress:{

        hasKey:false,

        hasNote:false,

        doorUnlocked:false

    },



    reset(){

        this.started=false;

        this.won=false;


        this.player.score=0;

        this.player.level=1;

        this.player.xp=0;

        this.player.hints=3;

        this.player.hintsUsed=0;

        this.player.itemsCollected=0;


        this.inventory=[];


        this.room=null;


        this.puzzle=null;


        this.timer.time=900;


        this.progress={

            hasKey:false,

            hasNote:false,

            doorUnlocked:false

        };


    }



};
