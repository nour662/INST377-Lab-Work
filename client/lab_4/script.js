/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
document.addEventListener('DOMContentLoaded', () => {
  let slidePosition = 0;
  const slides = document.getElementsByClassName('photo-grid-item');
  console.log(slides)
  const totalSlides = slides.length;

  document.getElementById('next-button').addEventListener('click', () => {
    moveToNextSlide();
    console.log('move')
  });
  document.getElementById('prev-button').addEventListener('click', () => {
    moveToPrevSlide();
  });

  function updateSlidePosition() {
    for (const slide of slides) {
      slide.classList.remove('photo-grid-item--visible');
      slide.classList.add('photo-grid-item--hidden');
    }
    console.log(slides[slidePosition])
    slides[slidePosition].classList.add('photo-grid-item--visible');
  }

  function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition++;
    }

    updateSlidePosition();
  }

  function moveToPrevSlide() {
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition--;
    }

    updateSlidePosition();
  }
});