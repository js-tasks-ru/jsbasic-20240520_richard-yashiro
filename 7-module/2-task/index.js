import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.initEventListeners();
  }

  render() {

    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;

    return modal;
  }

  initEventListeners() {

    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());


    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    if (this.elem.parentElement) {
      this.elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(node);
  }
}
