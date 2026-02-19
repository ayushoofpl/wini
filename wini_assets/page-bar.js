import throttle from 'lodash/throttle';

window.customElements.define('page-bar', class extends HTMLElement {
  constructor() {
    super();
    this.scrollPos = 0;
    this.stickThreshold = 20;
    this.handleScroll();
    this.brand = this.querySelector('.page-header__brand');
    window.addEventListener('scroll', throttle(() => {
      this.handleScroll();
    }, 100)
      .bind(this));
  }

  stick() {
    this.classList.add('page-bar_sticky');
  }

  unstick() {
    this.classList.remove('page-bar_sticky');
  }

  handleScroll() {
    if (window.scrollY >= this.stickThreshold) {
      this.stick();
    } else {
      this.unstick();
    }
    // Chrome 111 Bug. Irgendwas mit der transition, blur und fixed.
    // Mit overflow hidden und initial ist das aber geloest.
    this.style.overflowY = 'hidden';
    this.classList.toggle('page-bar_hidden', (window.scrollY >= 0 && this.scrollPos < window.scrollY));
    this.style.overflowY = 'initial';
    this.scrollPos = window.scrollY >= 0 ? window.scrollY : 0;
  }
});
