/* =====================================
   PLAYER SYSTEM
===================================== */

const Player={


    name:"Player",


    level:1,


    xp:0,


    health:100,


    maxHealth:100,


    score:0,


    addXP(amount){

        this.xp+=amount;


        if(this.xp>=100){

            this.level++;

            this.xp=0;

            console.log(
                "Level Up!",
                this.level
            );

        }

    },


    addScore(points){

        this.score+=points;

    },


    damage(value){

        this.health-=value;


        if(this.health<0)

            this.health=0;

    },


    heal(value){

        this.health+=value;


        if(this.health>this.maxHealth)

            this.health=this.maxHealth;

    },


    reset(){

        this.level=1;

        this.xp=0;

        this.health=100;

        this.score=0;

    },


    getData(){

        return {

            name:this.name,

            level:this.level,

            xp:this.xp,

            health:this.health,

            score:this.score

        };

    }

};
