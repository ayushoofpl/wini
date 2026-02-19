window.customElements.define('x-copy', class extends HTMLElement {
  constructor() {
    super();
    if (this.getAttribute('from')) {
      this.$target = document.querySelector(this.getAttribute('from'));
      if (this.$target) {
        this.innerHTML = this.$target.innerHTML;
      }
    }
  }
});
