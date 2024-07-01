import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetHeight || !this.elem.offsetWidth) {
      return;
    }
  
    const isMobile = document.documentElement.clientWidth <= 767;
  
    if (isMobile) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
      return;
    }
  
    const container = document.querySelector('.container');
    const containerRight = container.getBoundingClientRect().right;
    const viewportWidth = document.documentElement.clientWidth;
    const cartWidth = this.elem.offsetWidth;
    const leftIndent = Math.min(
      containerRight + 20,
      viewportWidth - cartWidth - 10
    ) + 'px';
  
    const initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    const isScrolledPastInitial = window.pageYOffset > initialTopCoord;
    const isScrolledToBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  
    if (isScrolledPastInitial || isScrolledToBottom) {
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        left: leftIndent
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
  }
}
}
