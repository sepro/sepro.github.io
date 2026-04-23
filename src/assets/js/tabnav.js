// Adds .is-stuck to the tab nav once the user scrolls past the hero's edge,
// and wires up the mobile burger toggle.
(function () {
  const nav = document.getElementById('tab-nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = nav.querySelector('.tab-nav__burger');
  if (!burger) return;

  const close = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
  };

  burger.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) close();
    else open();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      close();
      burger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target)) close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && nav.classList.contains('is-open')) close();
  });
})();
