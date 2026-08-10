/* =====================================
   ACHIEVEMENT SYSTEM
===================================== */

const Achievements = {

    key:"EscapeRoom_Achievements",

    unlocked:[],


    list:{

        firstEscape:{
            name:"First Escape",
            desc:"Completed your very first room.",
            icon:"🚪"
        },

        noHints:{
            name:"Puzzle Master",
            desc:"Escaped without using a single hint.",
            icon:"🧠"
        },

        fastEscape:{
            name:"Speed Runner",
            desc:"Escaped with more than half the timer left.",
            icon:"⚡"
        },

        collector:{
            name:"Collector",
            desc:"Picked up 6 or more items in one run.",
            icon:"🎒"
        },

        masterEscape:{
            name:"Master Escapist",
            desc:"Cleared every room and won the game.",
            icon:"🏆"
        }

    },


    load(){

        const data=

        localStorage.getItem(this.key);

        this.unlocked=data?JSON.parse(data):[];

    },


    unlock(id){

        if(!this.list[id])
            return;

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

        this.showToast(this.list[id]);

    },


    has(id){

        return this.unlocked.includes(id);

    },


    // ==================================
    // TOAST POPUP
    // ==================================

    showToast(achievement){

        const toast = document.createElement("div");

        toast.className = "achievementToast";

        toast.innerHTML = `
            <span class="achToastIcon">${achievement.icon}</span>
            <div class="achToastText">
                <div class="achToastLabel">Achievement Unlocked</div>
                <div class="achToastName">${achievement.name}</div>
            </div>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => toast.remove(), 400);

        }, 3200);

        if (typeof AudioManager !== "undefined") {

            AudioManager.play("success");

        }

    },


    // ==================================
    // RENDER LIST (achievements panel)
    // ==================================

    render(){

        const body = document.getElementById("achievementsBody");

        if (!body) return;

        body.innerHTML = "";

        Object.keys(this.list).forEach(id => {

            const ach = this.list[id];

            const unlocked = this.has(id);

            const row = document.createElement("div");

            row.className = "achRow" + (unlocked ? " unlocked" : " locked");

            row.innerHTML = `
                <span class="achIcon">${unlocked ? ach.icon : "🔒"}</span>
                <div class="achInfo">
                    <div class="achName">${ach.name}</div>
                    <div class="achDesc">${ach.desc}</div>
                </div>
            `;

            body.appendChild(row);

        });

    }

};


Achievements.load();
