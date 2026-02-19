import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.customElements.define('x-column-slider', class extends HTMLElement {
  constructor() {
    super();
    this.classList.add('swiper');
    this.insertAdjacentHTML('afterbegin', '<div class="column-slider__controls"><button class="swiper-button-prev"><x-icon class="icon"></x-icon></button><button class="swiper-button-next"><x-icon class="icon"></x-icon></button></div>');
    this.controls = this.querySelector('.column-slider__controls');
    this.defaults = {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        992: {
          slidesPerView: 3,
        },
      },
      navigation: {
        prevEl: this.querySelector('.swiper-button-prev'),
        nextEl: this.querySelector('.swiper-button-next'),
      },
    };
    this.options = this.getAttribute('options');
    try {
      this.options = JSON.parse(this.options);
    } catch (e) {
      console.warn('XColumnSlider: Options have wrong format', e);
      this.options = {};
    }
    this.settings = { ...this.defaults, ...this.options };
    this.swiper = new Swiper(this, this.settings);
    this.toggleControls(this.swiper);
    this.swiper.on('breakpoint', () => {
      requestAnimationFrame(() => this.toggleControls());
    });
  }

  toggleControls() {
    this.controls.classList.toggle('opacity-0', this.swiper.isLocked);
    return this.swiper.isLocked;
  }
});
