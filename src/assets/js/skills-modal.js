// Modal listing every skill, opened from the "…" chip in the hero.
(function () {
  function init() {
    const modal = document.querySelector('[data-skills-modal]');
    if (!modal || modal.dataset.skillsBound === '1') return;

    let lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('has-modal');
      const close = modal.querySelector('.modal__close');
      if (close) close.focus();
    }

    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('has-modal');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-skills-open]')) { open(); return; }
      if (e.target.closest('[data-skills-close]')) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    modal.dataset.skillsBound = '1';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('spa:navigated', init);
})();
