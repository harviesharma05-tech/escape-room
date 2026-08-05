/* =====================================
   ACHIEVEMENT SYSTEM
===================================== */

const Achievements = {

    key:"EscapeRoom_Achievements",

    unlocked:[],


    list:{

        firstEscape:{
            name:"First Escape",
            icon:"🚪"
        },

        noHints:{
            name:"Puzzle Master",
            icon:"🧠"
        },

        fastEscape:{
            name:"Speed Runner",
            icon:"⚡"
        },

        collector:{
            name:"Collector",
            icon:"🎒"
        }

    },


    load(){

        const data=

        localStorage.getItem(this.key);

        this.unlocked=data?JSON.parse(data):[];

    },


    unlock(id){

        if(this.unlocked.includes(id))
            return;


        this.unlocked.push(id);


        localStorage.setItem(

            this.key,

            JSON.stringify(this.unlocked)

        );


        console.log(

            "Achievement:",
            this.list[id].name

        );

    },


    has(id){

        return this.unlocked.includes(id);

    }

};


Achievements.load();
