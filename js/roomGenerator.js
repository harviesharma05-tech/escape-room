/* ==========================================
   ESCAPE ROOM - ROOM GENERATOR
========================================== */

const RoomGenerator = {

    rooms: [

        {
            id: 1,
            name: "Secret Laboratory",
            image: "assets/images/rooms/Lab.jpeg",
            difficulty: "easy"
        },

        {
            id: 2,
            name: "Haunted Library",
            image: "assets/images/rooms/Library.jpeg",
            difficulty: "medium"
        },

        {
            id: 3,
            name: "Cyber Bunker",
            image: "assets/images/rooms/Bunker.jpeg",
            difficulty: "hard"
        },

        {
            id: 4,
            name: "Abandoned Office",
            image: "assets/images/rooms/office.jpeg",
            difficulty: "medium"
        }

    ],

    currentRoom: null,

    objects: [
        "objKey",
        "objNote",
        "objKeypad",
        "objDoor"
    ],

    /* ==========================================
       GENERATE ROOM
    ========================================== */

    generate() {

        let difficulty = "medium";

        if (typeof Settings !== "undefined" &&
            Settings.data &&
            Settings.data.difficulty) {

            difficulty = Settings.data.difficulty;
        }

        let availableRooms = [];

        switch (difficulty) {

            case "easy":

                availableRooms = this.rooms.filter(
                    room => room.difficulty === "easy"
                );

                break;

            case "hard":

                availableRooms = this.rooms.filter(
                    room => room.difficulty === "hard"
                );

                break;

            default:

                availableRooms = this.rooms;

        }

        if (availableRooms.length === 0) {

            availableRooms = this.rooms;

        }

        const index = Math.floor(
            Math.random() * availableRooms.length
        );

        this.currentRoom = availableRooms[index];

        if (typeof GameState !== "undefined") {

            GameState.room = this.currentRoom;

        }

        this.load();

    },

    /* ==========================================
       LOAD ROOM
    ========================================== */

    load() {

        if (!this.currentRoom) return;

        const roomImage =
            document.getElementById("roomImage");

        if (roomImage) {

            roomImage.src = this.currentRoom.image;

            roomImage.onerror = function () {

                console.error(
                    "Room image not found:",
                    this.src
                );

            };

        }

        this.placeObjects();

        console.log(
            "Room Loaded:",
            this.currentRoom.name
        );

    },

    /* ==========================================
       PLACE OBJECTS
    ========================================== */

    placeObjects() {

        this.objects.forEach(id => {

            const object =
                document.getElementById(id);

            if (!object) return;

            const pos = this.randomPosition();

            object.style.left = pos.x;

            object.style.top = pos.y;

            object.style.display = "block";

            object.classList.remove("itemFound");

        });

    },

    /* ==========================================
       RANDOM POSITION
    ========================================== */

    randomPosition() {

        return {

            x:
                (10 + Math.random() * 75) + "%",

            y:
                (15 + Math.random() * 60) + "%"

        };

    },

    /* ==========================================
       NEXT ROOM
    ========================================== */

    nextRoom() {

        let index = this.rooms.findIndex(

            room => room.id === this.currentRoom.id

        );

        index++;

        if (index >= this.rooms.length) {

            index = 0;

        }

        this.currentRoom = this.rooms[index];

        if (typeof GameState !== "undefined") {

            GameState.room = this.currentRoom;

        }

        this.load();

    },

    /* ==========================================
       RELOAD ROOM
    ========================================== */

    reload() {

        this.load();

    },

    /* ==========================================
       RESET
    ========================================== */

    reset() {

        this.currentRoom = null;

        if (typeof GameState !== "undefined") {

            GameState.room = null;

        }

    }

};

/* ==========================================
   AUTO EXPORT
========================================== */

window.RoomGenerator = RoomGenerator;
