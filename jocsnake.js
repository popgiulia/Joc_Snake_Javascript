var canvas;
var ctx;
var gameControl;
var x = 8;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_COLOUR = 'greenyellow';
const SNAKE_BORDER_COLOUR = 'darkgreen';
var ok = 1;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    
    gameControl = startGame(x);
};

function startGame(x) {
    document.getElementById("status").innerHTML = "Game started";
    document.getElementById("score").innerHTML = "";
    return setInterval(draw, 1000 / x);
}

function endGame(x) {
    clearInterval(gameControl);
    document.getElementById("status").innerHTML = "Game Over";
    document.getElementById("score").innerHTML = "Score: " + x;
}

// Game world
var gridSize = 20;
var tileSize = 20;
var nextX = 0;
var nextY = 0;

// Snake and apple
var snakeX = 10;
var snakeY = 10;
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var appleX = 15;
var appleY = 15;
snakeX += nextX;
snakeY += nextY;
var snakeTrail = [];

function draw() {
    snakeX += nextX;
    snakeY += nextY;

    if (snakeX < 0)
        snakeX = gridSize - 1;
    if (snakeX > (gridSize - 1))
        snakeX = 0;
    if (snakeY < 0)
        snakeY = gridSize - 1;
    if (snakeY > (gridSize - 1))
        snakeY = 0;

    if ((snakeX == appleX) && (snakeY == appleY)) {
        tailSize++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    ctx.fillStyle = "cyan";
    ctx.strokestyle = CANVAS_BORDER_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokestyle = SNAKE_BORDER_COLOUR;
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(snakeTrail[i].a * tileSize, snakeTrail[i].b * tileSize, tileSize, tileSize);
        ctx.strokeRect(snakeTrail[i].a * tileSize, snakeTrail[i].b * tileSize, tileSize, tileSize);

        // Snake bites its tail?
        if (snakeTrail[i].a == snakeX && snakeTrail[i].b == snakeY) {
            if (tailSize > 3) {
                endGame(tailSize);
            }
            tailSize = defaultTailSize;
        }
    }

    // Paint apple
    ctx.fillStyle = "crimson";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // Set snake trail
    snakeTrail.push({ a: snakeX, b: snakeY });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
}

function keyDownEvent(a) {
    switch (a.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}
