/* ==========================================
   ESCAPE ROOM - INVENTORY.JS
========================================== */

const Inventory = {

    items: [],
    selectedItem: null,

    container: document.getElementById("inventoryItems"),

    // -------------------------
    // Add Item
    // -------------------------

    add(item){

        this.items.push(item);

        this.render();

        console.log(item.name + " added.");

    },

    // -------------------------
    // Remove Item
    // -------------------------

    remove(id){

        this.items = this.items.filter(i => i.id !== id);

        this.selectedItem = null;

        this.render();

    },

    // -------------------------
    // Get Item
    // -------------------------

    get(id){

        return this.items.find(i => i.id === id);

    },

    // -------------------------
    // Has Item
    // -------------------------

    has(id){

        return this.items.some(i => i.id === id);

    },

    // -------------------------
    // Select
    // -------------------------

    select(id){

        this.selectedItem = id;

        this.render();

    },

    // -------------------------
    // Clear
    // -------------------------

    clear(){

        this.items = [];

        this.selectedItem = null;

        this.render();

    },

    // -------------------------
    // Render
    // -------------------------

    render(){

        this.container.innerHTML = "";

        if(this.items.length===0){

            this.container.innerHTML =

            `<div class="inventoryEmpty">
                Inventory Empty
            </div>`;

            return;

        }

        this.items.forEach(item=>{

            const div=document.createElement("div");

            div.className="item";

            if(this.selectedItem===item.id){

                div.classList.add("selected");

            }

            div.innerHTML=`

                <div style="font-size:42px;">
                    ${item.icon}
                </div>

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

/* ==========================================
   DEFAULT ITEMS
========================================== */

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

    },

    screwdriver:{

        id:"tool",

        name:"Screwdriver",

        icon:"🪛"

    }

};

/* ==========================================
   Helper Functions
========================================== */

function addItem(id){

    if(GameItems[id]){

        if(!Inventory.has(GameItems[id].id)){

            Inventory.add(GameItems[id]);

        }

    }

}

function removeItem(id){

    Inventory.remove(id);

}

function hasItem(id){

    return Inventory.has(id);

}

/* ==========================================
   Start Empty
========================================== */

Inventory.render();
