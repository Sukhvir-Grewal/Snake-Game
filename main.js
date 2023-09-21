var snake = document.querySelector(".snake");
var head = document.querySelectorAll(".head");
var apple = document.querySelector(".apple");
var gameBoard = document.querySelector(".gameBoard");

var running;
var collisions = 15;
var currentKey = 0;

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
    var existingHead = document.querySelector(".head");

    newTail.classList.add("head");
    newTail.setAttribute("key", currentKey + 1);

    existingHead.parentNode.insertBefore(newTail, existingHead);

    newTail.style.left = `${movingOnX - 15}px`;
    newTail.style.top = `${movingOnY}px`;

    // Pushing all to back
    head.forEach((head) => {
        head.style.left = `${movingOnX - 15}px`;
    });

    head = document.querySelectorAll(".head");

    snake.style.width += 30;
    currentKey++;
}

function checkOverlapping() {
    if (
        applePositionX === movingOnX + (collisions - 15) &&
        applePositionY === movingOnY - 15
    ) {
        getPositionForApple();
        increaseSize();
        head.forEach((head) => {
            console.log(
                `Key: ${head.getAttribute("key")}`,
                `Left: ${parseInt(head.style.left)}`,
                `Top: ${parseInt(head.style.top)}`
            );
        });
        collisions += 15;
    }
}

getPositionForApple();


window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnX += 15;
            head.forEach((part) => {
                part.style.left = `${movingOnX}px`;
            });
            if (movingOnX >= 495) clearInterval(running);
            checkOverlapping();
        }, 200);
    } else if (e.key === "ArrowLeft") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnX -= 15;
            head.forEach((part) => {
                var currentLeft = parseInt(part.style.left || 0, 10);
                part.style.left = `${currentLeft - 15}px`;
            });
            if (movingOnX <= 0) clearInterval(running);
            checkOverlapping();
        }, 200);
    } else if (e.key === "ArrowDown") {
        clearInterval(running);
        running = setInterval(() => {
            head.forEach((part) => {
                var currentTop = parseInt(part.style.top || 0, 10);
                part.style.top = `${currentTop + 15}px`;
            });
            movingOnY += 15;
            checkOverlapping();

            if (movingOnY >= 495) clearInterval(running);
        }, 200);
    } else if (e.key === "ArrowUp") {
        clearInterval(running);
        running = setInterval(() => {
            movingOnY -= 15;
            head.forEach((part) => {
                var currentTop = parseInt(part.style.top || 0, 10);
                part.style.top = `${currentTop - 15}px`;
            });
            if (movingOnY <= 0) clearInterval(running);
            checkOverlapping();
        }, 200);
    }
});
