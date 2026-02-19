import SVGInject from '@iconfu/svg-inject';

SVGInject(document.querySelectorAll('img.icon'));

window.customElements.define('x-icon', class extends HTMLElement {
  constructor() {
    super();
    SVGInject(this);
  }
});
