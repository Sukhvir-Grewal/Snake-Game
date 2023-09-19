var snake = document.querySelector(".snake");
var head = document.querySelectorAll(".head");
var apple = document.querySelector(".apple");
var gameBoard = document.querySelector(".gameBoard");

var running;

var movingOnX = 0;
var movingOnY = 0;
var modFoundForX;
var modFoundForY;

var applePositionX;
var applePositionY;

snake.style.position = "relative";
apple.style.position = "relative";

function getPositionForApple() {
    modFoundForX = false;
    modFoundForY = false;
    while (!modFoundForX) {
        applePositionX = Math.floor(Math.random() * 495);
        if (applePositionX % 15 === 0) {
            apple.style.left = `${applePositionX}px`;
            modFoundForX = true;
        }
    }
    while (!modFoundForY) {
        applePositionY = Math.floor(Math.random() * 495);
        if (applePositionY % 15 === 0) {
            apple.style.top = `${applePositionY}px`;
            modFoundForY = true;
        }
    }
}

function increaseSize() {
    var newTail = document.createElement("div");
    newTail.classList.add("head");

    // Get a reference to the existing "head" element
    var existingHead = document.querySelector(".snake .head");

    // Insert the newTail before the existingHead
    existingHead.parentNode.insertBefore(newTail, existingHead);
    snake.style.width += 15;
    
}

function checkOverlapping() {
    if (applePositionX === (movingOnX + 30) && applePositionY === movingOnY - 15) {
        getPositionForApple();
        // increaseSize();
    }
}

getPositionForApple();

setInterval(() => {
    checkOverlapping();
}, 200);

window.addEventListener("keydown", (e) => {
    head = document.querySelectorAll(".head");  
    if (e.key === "ArrowRight") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnX += 15;
            head.forEach((head) => {
                head.style.left = `${movingOnX}px`;
            });

            if (movingOnX >= 495) clearInterval(running);
        }, 200);
    } else if (e.key === "ArrowLeft") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnX -= 15;
            head.forEach((head) => {
                head.style.left = `${movingOnX}px`;
            });

            if (movingOnX <= 0) clearInterval(running);
        }, 200);
    } else if (e.key === "ArrowDown") {
        // clearInterval(running);
        movingOnY += 15;
        head[2].style.top = `${movingOnY}px`;
        head[2].style.left = `${movingOnX - 15}px`;
        // head.forEach((head) => {
        //     head.style.top = `${movingOnY}px`;
        // });
        // running = setInterval(() => {

        //     if (movingOnY >= 495) clearInterval(running);
        // }, 200);
    } else if (e.key === "ArrowUp") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnY -= 15;
            head.forEach((head) => {
                head.style.top = `${movingOnY}px`;
            });

            if (movingOnY <= 0) clearInterval(running);
        }, 200);
    }
});
