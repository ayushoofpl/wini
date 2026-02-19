window.customElements.define('page-mobilenav', class extends HTMLElement {
  constructor() {
    super();
    this.burger = document.querySelector('.mobilenav-trigger');
    this.firstLevelNext = document.querySelectorAll('[data-first-next]');
    this.firstLevelItems = document.querySelectorAll('[data-first-level]');
    this.firstList = document.querySelector('[data-first-list]');
    this.secondLevelItems = document.querySelectorAll('[data-second-level]');
    this.secondContainers = document.querySelectorAll('[data-second-container]');
    this.secondCardContainer = document.querySelector('[data-second-card-container]');
    this.secondCloses = document.querySelectorAll('[data-second-close]');
    this.secondList = document.querySelector('.mainnav-sub__list');
    this.thirdLevelItems = document.querySelectorAll('[data-third-level]');
    this.thirdCloses = document.querySelectorAll('[data-third-close]');

    this.metaNav = document.querySelector('[data-meta-nav-list]');

    this.handleBurgerClick();
    this.secondLevel();
    this.thirdLevel();
  }

  secondLevel() {
    this.firstLevelNext.forEach((fNext) => {
      fNext.addEventListener('click', () => {
        this.firstLevelItems.forEach((fItem) => {
          fItem.classList.add('d-none');
        });
        this.metaNav.classList.add('d-none');
        this.secondContainers.forEach((container) => {
          this.fNextValue = fNext.getAttribute('data-first-next');
          this.secondContainerValue = container.getAttribute('data-second-container');
          if (this.fNextValue === this.secondContainerValue) {
            container.classList.add('d-block');
            this.firstList.classList.add('gap--0');
          }
        });
      });
    });

    this.secondCloses.forEach((sClose) => {
      sClose.addEventListener('click', () => {
        this.firstLevelItems.forEach((fItem) => {
          fItem.classList.remove('d-none');
        });
        this.metaNav.classList.remove('d-none');
        this.firstList.classList.remove('gap--0');
        this.secondContainers.forEach((container) => {
          container.classList.remove('d-block');
        });
      });
    });
  }

  thirdLevel() {
    this.secondLevelItems.forEach((sItem) => {
      sItem.addEventListener('click', () => {
        this.thirdLevelItems.forEach((tItem) => {
          tItem.classList.add('d-none');
          this.tValue = tItem.getAttribute('data-third-level');
          this.sValue = sItem.getAttribute('data-second-level');

          if (this.sValue === this.tValue) {
            this.thirdList = document.querySelector(`[data-third-list="${this.fNextValue}"]`);
            this.thirdList.classList.add('gap--0');
            this.thirdClose = document.querySelector(`[data-third-close="${this.tValue}"]`);
            this.thirdCloseText = this.thirdClose.querySelector('[data-third-close-text]');
            this.thirdCloseText.innerText = this.sValue;
            tItem.classList.remove('d-none');
            this.secondCardContainer.classList.add('d-none');
            this.secondList.classList.add('gap--0');

            this.secondLevelItems.forEach((item) => {
              item.classList.add('d-none');
            });
            this.secondCloses.forEach((sClose) => {
              sClose.classList.add('d-none');
            });
            this.thirdClose.classList.remove('d-none');
            this.secondList.classList.add('gap--0');

            this.thirdClose.addEventListener('click', () => {
              this.thirdLevelItems.forEach((tLevelItem) => {
                tLevelItem.classList.add('d-none');
              });
              this.secondCardContainer.classList.remove('d-none');
              this.secondLevelItems.forEach((item) => {
                item.classList.remove('d-none');
              });
              this.secondCloses.forEach((sClose) => {
                sClose.classList.remove('d-none');
              });
              this.thirdClose.classList.add('d-none');
              this.secondList.classList.remove('gap--0');
              this.thirdList.classList.remove('gap--0');
            });
          }
        });
      });
    });
  }

  handleBurgerClick() {
    this.burger.addEventListener('click', () => {
      this.toggle();
    });
  }

  get active() {
    return this.getAttribute('active');
  }

  set active(value) {
    if (value) {
      this.setAttribute('active', value);
    } else {
      this.removeAttribute('active');
    }
  }

  toggle() {
    this.active = this.active ? '' : 'true';
  }
});
