function openAccordionOnHash() {
  if (window.location.hash) {
    const elementId = window.location.hash.substring(1);
    if (!elementId) return;

    try {
      const targetElement = document.getElementById(elementId);

      if (targetElement) {
        const accordionCollapse = targetElement.querySelector('.accordion__header');
        
        if (accordionCollapse && accordionCollapse.classList.contains('collapsed')) {
          accordionCollapse.click();
        }
      }
    } catch (e) {
      // The hash might not be a valid selector for getElementById, though it's less likely.
      console.warn(`Could not process element for id: ${elementId}`, e);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // A small delay might be necessary for other scripts to initialize or for the layout to settle.
  setTimeout(openAccordionOnHash, 100);
});

window.addEventListener('hashchange', () => {
    openAccordionOnHash();
});
