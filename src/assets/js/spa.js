(function () {
  const CONTAINER = '.content-inner';
  const cache = new Map();

  async function fetchHtml(url) {
    if (cache.has(url)) return cache.get(url);
    const res = await fetch(url, { headers: { 'X-Requested-With': 'spa' } });
    if (!res.ok) throw new Error('SPA fetch failed: ' + res.status);
    const html = await res.text();
    cache.set(url, html);
    return html;
  }

  async function navigate(url, push = true) {
    let html;
    try {
      html = await fetchHtml(url);
    } catch (_) {
      window.location.href = url;
      return;
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const next = doc.querySelector(CONTAINER);
    const current = document.querySelector(CONTAINER);
    if (!next || !current) {
      window.location.href = url;
      return;
    }
    current.replaceChildren(...next.childNodes);
    document.title = doc.title;
    if (push) history.pushState({}, '', url);
    syncActiveTab();
    closeBurger();
    window.scrollTo(0, 0);
    document.dispatchEvent(new CustomEvent('spa:navigated', { detail: { url } }));
  }

  function syncActiveTab() {
    document.querySelectorAll('.tab-nav__tab').forEach((a) => {
      const active = a.pathname === location.pathname;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function closeBurger() {
    const nav = document.getElementById('tab-nav');
    if (!nav || !nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    const burger = nav.querySelector('.tab-nav__burger');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    if (url.href === location.href) return;
    navigate(url.pathname + url.search + url.hash);
  });

  window.addEventListener('popstate', () => {
    navigate(location.pathname + location.search + location.hash, false);
  });
})();
