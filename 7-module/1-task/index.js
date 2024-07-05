import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.initEventListeners();
  }

  render() {
  
    const ribbon = document.createElement('div');
    ribbon.className = 'ribbon';

    const ribbonInner = document.createElement('nav');
    ribbonInner.className = 'ribbon__inner';
    ribbon.append(ribbonInner);
  
    const arrowLeft = document.createElement('button');
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    ribbon.append(arrowLeft);

  
    for (let category of this.categories) {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'ribbon__item';
      item.dataset.id = category.id;
      item.textContent = category.name;
      ribbonInner.append(item);
    }


    const arrowRight = document.createElement('button');
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    ribbon.append(arrowRight);

    this.ribbonInner = ribbonInner;
    this.arrowLeft = arrowLeft;
    this.arrowRight = arrowRight;

    return ribbon;
  }

  initEventListeners() {

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

  
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    
    this.ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = this.ribbonInner.scrollLeft;
      const scrollWidth = this.ribbonInner.scrollWidth;
      const clientWidth = this.ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      this.arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
      this.arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
    });

 
    this.elem.addEventListener('click', (event) => {
      if (event.target.classList.contains('ribbon__item')) {
        event.preventDefault();

        const activeItem = this.elem.querySelector('.ribbon__item_active');
        if (activeItem) {
          activeItem.classList.remove('ribbon__item_active');
        }
        event.target.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        }));
      }
    });
  }
}
