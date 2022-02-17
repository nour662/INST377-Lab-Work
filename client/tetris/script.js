/* eslint-disable prefer-const */
/* eslint-disable indent */
document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const ScoreDisplay = document.querySelector('#score');
const StartBtn = document.querySelector('#start-button');
const width = 10;

// Tetrominos

const lTet = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const zTet = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
];

const tTet = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
];

const oTet = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];

const iTet = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
];

const tet = [lTet, zTet, tTet, oTet, iTet];

let currentPos = 4;
let currentRot = 0;

// randomly select tet
let random = Math.floor(Math.random() * tet.length);
let current = tet[random][0];

// draw
function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('block');
      squares[currentPosition + index].style.backgroundImage = colors[random];
    });
  }

function undraw() {
    current.forEach((index) => {
        squares[currentPos + index].classList.remove('tetromino');
    });
}

// make the tet more down every second

function moveDown() {
    undraw();
    currentPos += width;
    draw();
}

// freeze
function freeze() {
    if (current.some((index) => squares[currentPos + index + width].classList.contains('taken'))) {
        current.forEach((index) => squares[currentPos + index].classList.add('taken'));
        rand = Math.floor(Math.random() * tet.length);
        current = tet[random][currentRot];
        currentPos = 4;
        draw();
    }
}

// move left
function moveLeft() {
    undraw();
    const isAtLeft = current.some((index) => (currentPos + index) % width === 0);

    if (!isAtLeft) currentPos -= 1;

    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
        currentPos += 1;
    }
    draw();
}

// move right
function moveright() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition -= 1;
    }
    draw();
  }

  timerId = setInterval(moveDown, 1000);

// keyCode
function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    }
}
document.addEventListener('keyup' , control)
});
