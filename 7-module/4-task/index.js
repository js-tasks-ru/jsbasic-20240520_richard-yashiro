export default class StepSlider {
   constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.initEventListeners();
    this.updateSlider();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: ${this.value / (this.steps - 1) * 100}%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.value / (this.steps - 1) * 100}%;"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;

    this.updateSliderSteps();
  }

  updateSliderSteps() {
    const steps = this.elem.querySelector('.slider__steps').children;
    for (let i = 0; i < steps.length; i++) {
      steps[i].classList.toggle('slider__step-active', i === this.value);
    }
  }

  initEventListeners() {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown);
    this.elem.addEventListener('click', this.onClick);
  }

  onClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    this.updateSlider();
    this.dispatchSliderChange();
  };

  onPointerDown = (event) => {
    event.preventDefault();

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    this.elem.classList.add('slider_dragging');

    const onPointerMove = (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);

      this.elem.querySelector('.slider__value').innerHTML = this.value;
      this.updateSliderSteps();
    };

    const onPointerUp = () => {
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      this.updateSlider();
      this.dispatchSliderChange();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valuePercents = this.value / (this.steps - 1) * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.querySelector('.slider__value').innerHTML = this.value;
    this.updateSliderSteps();
  }

  dispatchSliderChange() {
    const sliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(sliderChangeEvent);
  }
}