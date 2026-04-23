// Custom dropdown for the publications year filter.
// Filters elements with [data-pub-year] inside [data-pub-list].
(function () {
  function init() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    if (!dropdowns.length) return;

    dropdowns.forEach((root) => {
      if (root.dataset.dropdownBound === '1') return;
      const trigger = root.querySelector('.dropdown__trigger');
      const label = root.querySelector('.dropdown__trigger-label');
      const panel = root.querySelector('.dropdown__panel');
      const targetSelector = root.getAttribute('data-target');
      const list = targetSelector ? document.querySelector(targetSelector) : null;
      const counter = document.querySelector('[data-pub-count]');

      function setSelected(value, text) {
        label.textContent = text;
        panel.querySelectorAll('.dropdown__option').forEach((o) => {
          o.classList.toggle('is-selected', o.getAttribute('data-value') === value);
        });
        apply(value);
        close();
      }

      function apply(value) {
        if (!list) return;
        const items = list.querySelectorAll('[data-pub-year]');
        let visible = 0;
        items.forEach((it) => {
          const year = it.getAttribute('data-pub-year');
          const show = value === 'All' || year === value;
          it.hidden = !show;
          if (show) visible++;
        });
        if (counter) {
          if (value === 'All') {
            counter.textContent = '';
          } else {
            counter.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
          }
        }
      }

      function open() { root.classList.add('is-open'); }
      function close() { root.classList.remove('is-open'); }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        root.classList.contains('is-open') ? close() : open();
      });

      panel.addEventListener('click', (e) => {
        const opt = e.target.closest('.dropdown__option');
        if (!opt) return;
        setSelected(opt.getAttribute('data-value'), opt.textContent.trim());
      });

      document.addEventListener('mousedown', (e) => {
        if (!root.contains(e.target)) close();
      });

      root.dataset.dropdownBound = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('spa:navigated', init);
})();
