/* ==========================================
   ESCAPE ROOM - UTILS.JS
========================================== */

// ==========================================
// RANDOM NUMBER
// ==========================================

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// RANDOM ARRAY ITEM
// ==========================================

function randomItem(array) {
    if (!array || array.length === 0) return null;
    return array[random(0, array.length - 1)];
}

// ==========================================
// SHORTCUTS
// ==========================================

function $(id) {
    return document.getElementById(id);
}

function create(tag) {
    return document.createElement(tag);
}

// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message, type = "success") {

    let box = $("messageBox");

    if (!box) {

        box = create("div");
        box.id = "messageBox";
        document.body.appendChild(box);

    }

    box.innerHTML = message;

    box.className = "";

    box.classList.add("messageBox");
    box.classList.add(type);

    box.style.display = "block";

    setTimeout(() => {

        box.style.opacity = "1";

    }, 10);

    setTimeout(() => {

        box.style.opacity = "0";

        setTimeout(() => {

            box.style.display = "none";

        }, 300);

    }, 2500);

}

// ==========================================
// FADE IN
// ==========================================

function fadeIn(element) {

    if (!element) return;

    element.style.opacity = 0;
    element.style.display = "block";

    let opacity = 0;

    let timer = setInterval(() => {

        opacity += 0.05;

        element.style.opacity = opacity;

        if (opacity >= 1) {

            clearInterval(timer);

        }

    }, 20);

}

// ==========================================
// FADE OUT
// ==========================================

function fadeOut(element) {

    if (!element) return;

    let opacity = 1;

    let timer = setInterval(() => {

        opacity -= 0.05;

        element.style.opacity = opacity;

        if (opacity <= 0) {

            clearInterval(timer);

            element.style.display = "none";

        }

    }, 20);

}

// ==========================================
// SHOW ELEMENT
// ==========================================

function show(id) {

    const element = $(id);

    if (element)
        element.classList.remove("hidden");

}

// ==========================================
// HIDE ELEMENT
// ==========================================

function hide(id) {

    const element = $(id);

    if (element)
        element.classList.add("hidden");

}

// ==========================================
// TOGGLE ELEMENT
// ==========================================

function toggle(id) {

    const element = $(id);

    if (!element) return;

    element.classList.toggle("hidden");

}

// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(seconds) {

    let min = Math.floor(seconds / 60);

    let sec = seconds % 60;

    if (min < 10) min = "0" + min;

    if (sec < 10) sec = "0" + sec;

    return min + ":" + sec;

}

// ==========================================
// CLAMP VALUE
// ==========================================

function clamp(value, min, max) {

    return Math.min(Math.max(value, min), max);

}

// ==========================================
// SAVE TO LOCAL STORAGE
// ==========================================

function save(key, data) {

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

// ==========================================
// LOAD FROM LOCAL STORAGE
// ==========================================

function load(key) {

    const data = localStorage.getItem(key);

    if (!data)
        return null;

    return JSON.parse(data);

}

// ==========================================
// REMOVE LOCAL STORAGE
// ==========================================

function remove(key) {

    localStorage.removeItem(key);

}

// ==========================================
// SHAKE EFFECT
// ==========================================

function shake(element) {

    if (!element) return;

    element.classList.add("shake");

    setTimeout(() => {

        element.classList.remove("shake");

    }, 500);

}

// ==========================================
// PLAY CLICK SOUND
// ==========================================

function clickSound() {

    if (
        typeof AudioManager !== "undefined" &&
        AudioManager.play
    ) {

        AudioManager.play("click");

    }

}

// ==========================================
// PRELOAD IMAGE
// ==========================================

function preload(src) {

    const img = new Image();

    img.src = src;

}

// ==========================================
// PRELOAD ROOM IMAGES
// ==========================================

window.addEventListener("load", () => {

    preload("assets/images/rooms/Lab.jpeg");
    preload("assets/images/rooms/Library.jpeg");
    preload("assets/images/rooms/Bunker.jpeg");
    preload("assets/images/rooms/office.jpeg");

});

console.log("utils.js Loaded Successfully");
