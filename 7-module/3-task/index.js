export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.initEventListeners();
  }

  render() {
    let slider = document.createElement('div');
    slider.className = 'slider';

    let thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;
    slider.append(thumb);

    let progress = document.createElement('div');
    progress.className = 'slider__progress';
    slider.append(progress);

    let steps = document.createElement('div');
    steps.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      if (i === this.value) {
        span.className = 'slider__step-active';
      }
      steps.append(span);
    }

    slider.append(steps);

    this.elem = slider; 
    this.updateSlider();

    return slider;
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);

      this.updateSlider();

      let customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });
  }

  updateSlider() {
    let valuePercents = this.value / (this.steps - 1) * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let valueElement = thumb.querySelector('.slider__value');
    let steps = this.elem.querySelectorAll('.slider__steps span');

    valueElement.innerText = this.value;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }
}
