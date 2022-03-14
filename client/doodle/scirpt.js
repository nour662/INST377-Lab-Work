/* eslint-disable no-plusplus */
document.addEventListener('DomContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const doodlerLeftSpace = 50;
  const doodlerBottomSpace = 150;
  const platformCount = 5;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  class Platfrom {
    constructor(newPlatfromBottom) {
      this.bottom = newPlatfromBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const {visual} = this;
      visual.classList.add('platform');
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;
      grid.appendChild(visual);
    }
  }
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformGap;
      let newPlatform = new Platfrom(newPlatformBottom);
      
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler();
      createPlatforms();
    }
  }
  // attach to a button
  start();
});