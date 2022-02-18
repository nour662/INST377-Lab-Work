/* eslint-disable no-use-before-define */
/* eslint-disable no-loop-func */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;

  // keyCode
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);
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
      squares[currentPos + index].classList.add('tetromino');
      squares[currentPos + index].style.backgroundImage = colors[random];
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
    freeze();
  }
  // add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * tet.length);
      displayShape();
    }
  });
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
  function moveRight() {
    undraw();
    const isAtRight = current.some((index) => (currentPos + index) % width === width - 1);
    if (!isAtRight) currentPos += 1;
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      currentPos -= 1;
    }
    draw();
  }

  // freeze
  function freeze() {
    if (current.some((index) => squares[currentPos + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPos + index].classList.add('taken'));
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tet.length);
      current = tet[random][currentRot];
      currentPos = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }
  // rotate
  function rotate() {
    undraw();
    currentRot++;
    if (currentRot === current.length) {
      currentRot = 0;
    }
    current = tet[random][currentRot];
    draw();
  }
  function gameOver() {
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      ScoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }
  // minigrid
  const displaySquares = document.querySelectorAll('mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;

  // tet without rotations
  const nextTet = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
  ];

  // display shape

  function displayShape () {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    nextTet[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }

  // add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        ScoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild);
      }
    }
  }
});
