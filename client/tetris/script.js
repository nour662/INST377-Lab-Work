/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const tet = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPos = 4;
  let currentRot = 0;

  // randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * tet.length);
  let current = tet[random][currentRot];

  // draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPos + index].classList.add('tetromino');
    });
  }

  // undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPos + index].classList.remove('tetromino');
    });
  }

  // assign functions to keyCodes
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

  // move down function
  function moveDown() {
    undraw();
    currentPos += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (current.some((index) => squares[currentPos + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPos + index].classList.add('taken'));
      // start a new tetromino falling
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

  // move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const atLeftEdge = current.some((index) => (currentPos + index) % width === 0);
    if (!atLeftEdge) currentPos -= 1;
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      currentPos += 1;
    }
    draw();
  }

  // move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const atRightEdge = current.some((index) => (currentPos + index) % width === width - 1);
    if (!atRightEdge) currentPos += 1;
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      currentPos -= 1;
    }
    draw();
  }
  
  // rotate the tetromino
  function rotate() {
    undraw();
    currentRot++;
    if (currentRot === current.length) {
      currentRot = 0;
    }
    current = tet[random][currentRot];
    draw();
  }
  /// //////

  // show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;

  // the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
    [0, 1, displayWidth, displayWidth + 1], // oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
  ];

  // display the shape in the mini-grid display
  function displayShape() {
    // remove any trace of a tetromino form the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
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

  // add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // game over
  function gameOver() {
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }
});