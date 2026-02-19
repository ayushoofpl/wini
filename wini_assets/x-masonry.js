import './x-masonry.scss';
import Masonry from 'masonry-layout/masonry';
import debounce from 'lodash/debounce';

window.customElements.define('x-masonry', class extends HTMLElement {
  constructor() {
    super();
    this.classList.add('masonry');
    this.content = this.innerHTML;
    this.innerHTML = '<div class="masonry__body"></div>';
    this.$body = this.querySelector('.masonry__body');
    this.$body.innerHTML = this.content;
    this.$body.insertAdjacentHTML('beforeend', '<div class="masonry-sizer col-1"></div>');
    this.init();
    window.addEventListener('resize', debounce(() => {
      this.init();
    }, 200));
    this.querySelectorAll('img')
      .forEach((img) => {
        img.addEventListener('load', () => this.masonry.layout());
      });
  }

  init() {
    if (this.masonry) {
      this.masonry.destroy();
    }
    this.masonry = new Masonry(this.$body, {
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      fitWidth: true,
      transitionDuration: 0,
      resize: false,
    });
  }
});
