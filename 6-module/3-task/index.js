import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;

    this.elem = this.createCarousel();
    this.initCarousel();
  }

  createCarousel() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    arrowRight.addEventListener('click', () => {
      this.currentSlideIndex++;
      this.updateCarousel(carouselInner, arrowLeft, arrowRight);
    });

    arrowLeft.addEventListener('click', () => {
      this.currentSlideIndex--;
      this.updateCarousel(carouselInner, arrowLeft, arrowRight);
    });

    this.elem.querySelectorAll('.carousel__button').forEach(button => {
      button.addEventListener('click', () => {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
      });
    });
  }

  updateCarousel(carouselInner, arrowLeft, arrowRight) {
    const offset = -carouselInner.offsetWidth * this.currentSlideIndex;
    carouselInner.style.transform = `translateX(${offset}px)`;

    arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    arrowRight.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : '';
  }
}
