/* =====================================
   LEADERBOARD SYSTEM
===================================== */

const Leaderboard = {

    key:"EscapeRoom_Leaderboard",

    scores:[],

    load(){

        const data = localStorage.getItem(this.key);

        this.scores = data ? JSON.parse(data) : [];

    },


    add(name,score,time){

        this.scores.push({

            name:name,

            score:score,

            time:time,

            date:new Date().toLocaleDateString()

        });


        this.scores.sort((a,b)=>b.score-a.score);


        this.scores=this.scores.slice(0,10);


        this.save();

    },


    save(){

        localStorage.setItem(

            this.key,

            JSON.stringify(this.scores)

        );

    },


    get(){

        return this.scores;

    },


    clear(){

        localStorage.removeItem(this.key);

        this.scores=[];

    }

};


Leaderboard.load();
