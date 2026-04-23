// Toggles non-featured items in collapsible Other-tab sections.
(function () {
  function init() {
    const buttons = document.querySelectorAll('[data-show-more]');
    buttons.forEach((btn) => {
      if (btn.dataset.showMoreBound === '1') return;
      const targetSelector = btn.getAttribute('data-show-more');
      const labelEl = btn.querySelector('[data-show-more-label]');
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const extras = target.querySelectorAll('[data-extra]');
      const showText = btn.getAttribute('data-show-text') || `Show ${extras.length} more`;
      const hideText = btn.getAttribute('data-hide-text') || 'Show less';

      let expanded = false;

      function render() {
        extras.forEach((el) => { el.classList.toggle('is-collapsed', !expanded); });
        btn.classList.toggle('is-expanded', expanded);
        if (labelEl) labelEl.textContent = expanded ? hideText : showText;
      }

      render();
      btn.addEventListener('click', () => { expanded = !expanded; render(); });
      btn.dataset.showMoreBound = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('spa:navigated', init);
})();
