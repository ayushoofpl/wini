import throttle from 'lodash/throttle';

window.customElements.define(
  'page-mainnav',
  class extends HTMLElement {
    constructor() {
      super();
      this.$subs = this.querySelectorAll('.mainnav-sub');
      this.$links = this.querySelectorAll('.js-page-mainnav-show-sub');
      window.addEventListener('click', (e) => {
        if (!e.target.closest('page-bar')) {
          this.hideSubs();
        }
      });
      window.addEventListener('mousemove', throttle((e) => {
        if (e.target && e.target.closest && !e.target.closest('page-bar')) {
          this.hideSubs();
        }
      }, 500).bind(this));
      this.addEventListener('click', (e) => {
        const $currentSub = e.target.nextElementSibling;
        if ($currentSub && $currentSub.classList.contains('mainnav-sub')) {
          e.preventDefault();
          this.hideSubs();
          $currentSub.classList.toggle('is-active');
          e.target.classList.toggle('is-active');
          // hide scrollbar
          if (!$currentSub.classList.contains('mainnav-sub_bar')) {
            document.querySelector('html').style.position = 'fixed';
            document.querySelector('html').style.overflowY = 'scroll';
            document.querySelector('html').style.width = '100%';
          }
        }
        if (e.target.closest('.js-page-mainnav-hide-sub')) {
          this.hideSubs();
        }
      });
    }

    hideSubs() {
      this.$subs.forEach(($sub) => $sub.classList.remove('is-active'));
      this.$links.forEach(($link) => $link.classList.remove('is-active'));
      // show scrollbar
      document.querySelector('html').style.position = 'initial';
      document.querySelector('html').style.overflowY = 'initial';
      document.querySelector('html').style.width = 'auto';
    }
  },
);
