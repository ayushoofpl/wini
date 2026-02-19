window.customElements.define('x-tab-select', class extends HTMLElement {
  constructor() {
    super();
    this.select = this.querySelector('select');
    this.toggleWithBs();
    this.addEventListener('change', () => {
      this.activateTab();
    });
  }

  toggleWithBs() {
    const tabEl = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabEl.forEach((tab) => {
      tab.addEventListener('shown.bs.tab', (event) => {
        const target = event.target.dataset.bsTarget;
        const options = this.select.children;
        for (let i = 0, len = options.length; i < len; i += 1) {
          if (options[i].dataset.target === target) {
            options[i].selected = 'selected';
          }
        }
      });
    });
  }

  activateTab() {
    const options = this.select.children;
    let target = null;
    let targetId = null;

    for (let i = 0, len = options.length; i < len; i += 1) {
      if (options[i].textContent === this.select.value) {
        target = options[i].dataset.target;
        targetId = target.substring(1);
      }
    }

    const tablistElements = this.parentElement.previousElementSibling.children;
    for (let i = 0, len = tablistElements.length; i < len; i += 1) {
      if (tablistElements[i].dataset.bsTarget === target) {
        tablistElements[i].classList.add('active');
      } else {
        tablistElements[i].classList.remove('active');
      }
    }

    const tabElements = document.querySelector(target).parentElement.children;
    for (let i = 0, len = tabElements.length; i < len; i += 1) {
      if (tabElements[i].getAttribute('id') === targetId) {
        tabElements[i].classList.add('active');
      } else {
        tabElements[i].classList.remove('active');
      }
    }
  }
});
