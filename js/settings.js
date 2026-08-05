/* =====================================
   SETTINGS SYSTEM
===================================== */

const Settings = {

    key:"EscapeRoom_Settings",


    data:{

        music:true,

        sound:true,

        difficulty:"normal"

    },


    load(){

        const saved=

        localStorage.getItem(this.key);


        if(saved){

            this.data=JSON.parse(saved);

        }

    },


    save(){

        localStorage.setItem(

            this.key,

            JSON.stringify(this.data)

        );

    },


    toggleMusic(){

        this.data.music=

        !this.data.music;


        this.save();

    },


    toggleSound(){

        this.data.sound=

        !this.data.sound;


        this.save();

    },


    setDifficulty(level){

        this.data.difficulty=level;

        this.save();

    }

};


Settings.load();
