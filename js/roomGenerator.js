/* ==========================================
   ESCAPE ROOM - ROOM GENERATOR
========================================== */

const RoomGenerator = {

    rooms: [

        {
            id: 1,
            name: "Secret Laboratory",
            image: "assets/images/rooms/lab.jpg",

            objects: {

                key: {
                    left: "18%",
                    top: "72%"
                },

                note: {
                    left: "62%",
                    top: "60%"
                },

                keypad: {
                    left: "82%",
                    top: "46%"
                },

                door: {
                    right: "5%",
                    top: "24%"
                }

            }

        },

        {
            id: 2,
            name: "Haunted Library",
            image: "assets/images/rooms/library.jpg",

            objects: {

                key: {
                    left: "70%",
                    top: "80%"
                },

                note: {
                    left: "25%",
                    top: "45%"
                },

                keypad: {
                    left: "80%",
                    top: "52%"
                },

                door: {
                    right: "4%",
                    top: "22%"
                }

            }

        },

        {
            id: 3,
            name: "Cyber Bunker",
            image: "assets/images/rooms/bunker.jpg",

            objects: {

                key: {
                    left: "12%",
                    top: "66%"
                },

                note: {
                    left: "40%",
                    top: "70%"
                },

                keypad: {
                    left: "83%",
                    top: "42%"
                },

                door: {
                    right: "5%",
                    top: "18%"
                }

            }

        }

    ],

    currentRoom: null,

    //--------------------------------------

    generate() {

        const index = Math.floor(

            Math.random() *

            this.rooms.length

        );

        this.currentRoom =

            this.rooms[index];

        this.load();

    },

    //--------------------------------------

    load() {

        const room = this.currentRoom;

        console.log("Room Loaded:", room.name);

        document
            .getElementById("roomImage")
            .src = room.image;

        this.placeObjects(room.objects);

    },

    //--------------------------------------

    placeObjects(objects) {

        const key =

            document.getElementById("objKey");

        const note =

            document.getElementById("objNote");

        const keypad =

            document.getElementById("objKeypad");

        const door =

            document.getElementById("objDoor");

        // KEY

        key.style.left = objects.key.left;
        key.style.top = objects.key.top;

        // NOTE

        note.style.left = objects.note.left;
        note.style.top = objects.note.top;

        // KEYPAD

        keypad.style.left = objects.keypad.left;
        keypad.style.top = objects.keypad.top;

        // DOOR

        door.style.right = objects.door.right;
        door.style.top = objects.door.top;

    }

};

// ===================================
// Generate Random Room
// ===================================

window.addEventListener("load", () => {

    RoomGenerator.generate();

});
