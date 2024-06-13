function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const slideWidth = carouselInner.offsetWidth;
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  let currentSlide = 0;

  const updateCarousel = () => {
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = currentSlide === 3 ? 'none' : '';
  };

  arrowRight.addEventListener('click', () => {
    if (currentSlide < 3) currentSlide++;
    updateCarousel();
  });

  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) currentSlide--;
    updateCarousel();
  });

  updateCarousel();
}