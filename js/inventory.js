/* ==========================================
   ESCAPE ROOM - INVENTORY
========================================== */


const Inventory = {


    items:[],


    selected:null,


    container:
    document.getElementById("inventoryItems"),



    add(item){


        if(this.has(item.id))
            return;



        this.items.push(item);


        GameState.inventory=this.items;

        if (GameState.player) {

            GameState.player.itemsCollected =
                (GameState.player.itemsCollected || 0) + 1;

        }


        this.render();


    },




    remove(id){


        this.items = this.items.filter(

            item=>item.id!==id

        );


        GameState.inventory=this.items;


        this.render();


    },




    has(id){


        return this.items.some(

            item=>item.id===id

        );


    },




    select(id){


        this.selected=id;


        this.render();


    },




    load(items){


        this.items=items || [];


        GameState.inventory=this.items;


        this.render();


    },




    clear(){


        this.items=[];


        GameState.inventory=[];


        this.render();


    },




    render(){


        if(!this.container)
            return;



        this.container.innerHTML="";



        if(this.items.length===0){


            this.container.innerHTML=

            `<div class="inventoryEmpty">
                Empty
            </div>`;


            return;

        }



        this.items.forEach(item=>{


            let div=document.createElement("div");



            div.className="item";



            if(this.selected===item.id)

                div.classList.add("selected");



            div.innerHTML=

            `

            <span>

            ${item.icon}

            </span>


            <div class="itemName">

            ${item.name}

            </div>

            `;



            div.onclick=()=>{

                this.select(item.id);

            };



            this.container.appendChild(div);


        });



    }



};




const GameItems={


key:{

id:"key",

name:"Golden Key",

icon:"🔑"

},


note:{

id:"note",

name:"Secret Note",

icon:"📜"

},


battery:{

id:"battery",

name:"Battery",

icon:"🔋"

},


flashlight:{

id:"flashlight",

name:"Flashlight",

icon:"🔦"

}



};



function addItem(id){


    if(GameItems[id])

        Inventory.add(GameItems[id]);


}



function removeItem(id){


    Inventory.remove(id);


}



function hasItem(id){


    return Inventory.has(id);


}
