// Shared tab behaviour for the Probability Lab and Statistics Lab.
// Tabs are <button role="tab" data-tab="id"> and each panel is <section class="panel" id="id">.
// Clicking a tab or pressing ← / → / Home / End moves between tabs; the URL hash follows
// the active tab so a link can open a specific tab. Buttons with data-go="id" open a tab too.
(() => {
  function init({ onShow = () => {}, aliases = {}, fallback = 'intro' } = {}) {
    const tabs = [...document.querySelectorAll('[role=tab][data-tab]')];
    const panelFor = id => document.getElementById(id);
    const known = id => tabs.some(t => t.dataset.tab === id) && panelFor(id);

    tabs.forEach(t => t.setAttribute('aria-controls', t.dataset.tab));

    function current() {
      const selected = tabs.find(t => t.getAttribute('aria-selected') === 'true');
      return selected ? selected.dataset.tab : fallback;
    }

    function show(id, focus) {
      if (!known(id)) id = fallback;
      tabs.forEach(t => {
        const on = t.dataset.tab === id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panelFor(t.dataset.tab).classList.toggle('active', on);
        if (on && focus) t.focus();
      });
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// or sandbox */ }
      onShow(id);
    }

    tabs.forEach((t, i) => {
      t.addEventListener('click', () => { show(t.dataset.tab); window.scrollTo({ top: 0 }); });
      t.addEventListener('keydown', e => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        let target = null;
        if (step) target = tabs[(i + step + tabs.length) % tabs.length];
        if (e.key === 'Home') target = tabs[0];
        if (e.key === 'End') target = tabs[tabs.length - 1];
        if (target) { e.preventDefault(); show(target.dataset.tab, true); }
      });
    });
    document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      show(b.dataset.go);
      window.scrollTo({ top: 0 });
    }));

    // Opens the tab named in the URL hash (old names are mapped through aliases), else the fallback.
    // Call once, after any onShow handlers are ready.
    function start() {
      const requested = location.hash.slice(1);
      const id = aliases[requested] || requested;
      if (location.hash) {
        // A #tab link makes the browser jump to that section; keep the page at the top of the tabs.
        try { history.scrollRestoration = 'manual'; } catch (e) { /* old browser */ }
        window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
      }
      show(known(id) ? id : fallback);
    }

    return { show, start, current };
  }

  window.LabTabs = { init };
})();
