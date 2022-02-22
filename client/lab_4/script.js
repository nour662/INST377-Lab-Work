/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
document.addEventListener('DOMContentLoaded', () => {
  let slidePos = 0;
  const slides = document.querySelectorAll('photo-grid-items');
  const totalSlides = slides.length;

  document.querySelector('#next-button').addEventListener('click', () => {
    moveToNext();
  });
  document.querySelector('#prev-button').addEventListener('click', () => {
    moveToPrev();
  });

  function updateSlidePos() {
    for (const slide of slides) {
      slide.classList.remove('photo_grid_item--visible');
      slide.classList.add('photo_grid_item--hidden');
    }
    slides[slidePos].classList.add('photo-grid-item photo-grid-item--visible');
  }

  function moveToNext() {
    if (slidePos === totalSlides - 1) {
      slidePos = 0;
    } else {
      slidePos++;
    }
    updateSlidePos();
  }
  function moveToPrev() {
    if (slidePos === 0) {
      slidePos = totalSlides - 1;
    } else {
      slidePos--;
    }
    updateSlidePos();
  }
});