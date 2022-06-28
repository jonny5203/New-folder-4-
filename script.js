let app;

//Model
let gameStart = false;
let points = 0;
let gameOver = false;

const board = 16 ** 2;

let lastCell; // hodet til slangen

let currentApplePosition = 6;

let currentCell; // snake.position[-1]??

let snake = {
    snakeLength: 5,
    position: [
        0,
        1,
        2,
        3,
        4
    ],
    direction: 1,
    getPosition: function(a,b){
        let y = a+b;
        return y;
    }
};

const up = 'w';
const down = 's';
const right = 'd';
const left = 'a';


//View
window.onload = function () {
    app = document.getElementById('app');
    updateView();
};
function updateView() {
    let htmlCode = '';
    for (let i = 0; i < board; i++) {
        if (i % 16 == 0 && i != 0) {
            if (i != currentApplePosition) {
                if (snake.position.includes(i)) {
                    htmlCode += '<div class="cell forstPaLinje snake">♥</div>';
                } else {
                    htmlCode += '<div class="cell forstPaLinje"></div>';
                }
            } else {
                if (snake.position.includes(i)) {
                    htmlCode += '<div class="cell forstPaLinje snake">♥</div>';
                } else {
                    htmlCode += '<div class="cell forstPaLinje APPLE"></div>';
                }
            }

        } else {
            if (i != currentApplePosition) {
                if (snake.position.includes(i)) {
                    htmlCode += '<div class="cell snake">♥</div>';
                } else {
                    htmlCode += '<div class="cell"></div>';
                }
            } else {
                if (snake.position.includes(i)) {
                    htmlCode += '<div class="cell snake">♥</div>';
                } else {
                    htmlCode += '<div class="cell apple">🍏</div>';
                } // slangen kan se sånn her ut: ~---> ~ er rumpa, - er kroppen, > er hodet. 
                // Sjekke om snake.position er den minste i snake.position, hvis den er det, så får den ~ (rumpa).
                // Hvis den er ikke den minste, men ikke den største, så er den - (kropp).
                // Hvis den er den største så får den > (hodet).
            }

        }
    

    }
    htmlCode += `<div><h1>Du har: ${points} poeng</h1></div>`;
    console.log(snake.getPosition(3,5));
    app.innerHTML = htmlCode;
}

//Controller

document.addEventListener('keydown', function (event) {
    if (event.key == "w") {
        if(snake.direction != 2){
            snake.direction = 0;
        }
    } else if (event.key == "a") {
        if(snake.direction != 3){
            snake.direction = 1;
        }
    } else if (event.key == "s") {
        if(snake.direction != 0){
            snake.direction = 2;
        }
    } else if (event.key == "d") {
        if(snake.direction != 1){
            snake.direction = 3;
        }
    }
});

function startGameLoop() {
    setInterval(gameTick, 300);
}

function gameOverFunction() {
    clearInterval();
}

function checkGameOver() {

}

function gameTick() {
    moveSnake();
    updateView();
}

// #TODO: refactor this into two functions. 
function moveSnake() {

    //implement function to not allow snake to go backward
    //cannot go the other direction as well
    let newSnakePositionArray = Array.from(snake.position);
    for (let i = 0; i < snake.position.length; i++) {
        if (snake.position.length - 1 != i) {
            snake.position[i] = newSnakePositionArray[i + 1];
        } else {
            //console.log(i);
            if (snake.direction == 0) {
                snake.position[i] -= 16;
            } else if (snake.direction == 1) {
                snake.position[i] -= 1;
            } else if (snake.direction == 2) {
                snake.position[i] += 16;
            } else if (snake.direction == 3) {
                snake.position[i] += 1;
            }
        }
    }

    consumeApple();
}

function expandSnake(newPosition) {
    snake.position.push(newPosition);
}

function consumeApple() {
    if (snake.position[snake.position.length - 1] == currentApplePosition) {
        snake.position.push(currentApplePosition);
        applePlacement();
        points++;
    }
    // Den skal calle expandSnake?
}

function applePlacement() {

    let availableSpace = [];

    for (let i = 0; i < board; i++) {
        if (!snake.position.includes(i)) {
            availableSpace.push(i);
        }
    }

    currentApplePosition = availableSpace[Math.floor(Math.random() * availableSpace.length)];
}

function mapKeyboard() {

}