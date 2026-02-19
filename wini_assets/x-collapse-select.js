import Collapse from 'bootstrap/js/src/collapse';

window.customElements.define('x-collapse-select', class extends HTMLElement {
  constructor() {
    super();
    this.select = this.querySelector('select');
    this.switchCollapse();
    this.addEventListener('change', () => {
      this.switchCollapse();
    });
  }

  switchCollapse() {
    if (!this.select.options) return;
    const $targets = [...this.select.options]
      .map((option) => document.querySelector(option.dataset.target));
    const targetSelector = this.select.selectedOptions[0].dataset.target;
    if (!targetSelector) return;
    $targets.forEach((item) => {
      const collapseInstance = Collapse.getOrCreateInstance(item, { toggle: false });
      if (item.matches(targetSelector)) {
        collapseInstance.show();
      } else {
        collapseInstance.hide();
      }
    });
  }
});
