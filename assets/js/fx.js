/* Interaction layer: magnetic buttons, kinetic headings,
   scroll-velocity marquee, 3D tilt cards and a SPEEDIOO logo screen on page change.
   Everything is delegated from document, so it works after every route render.
   Touch devices and reduced-motion users get the calm version. */
(function () {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- kinetic headings: split words so they can rise in ---------- */
  function splitWords(el) {
    if (!el || el.dataset.split) return; el.dataset.split = '1';
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el);
  }
  function enhance(scope) {
    if (reduce) return;
    (scope || document).querySelectorAll('.hero-v5 h1, .sec-head.rv h2').forEach(splitWords);
  }

  /* ---------- page change: the SPEEDIOO logo screen from the opening, briefly ---------- */
  const pl = document.createElement('div'); pl.className = 'pageload'; pl.setAttribute('aria-hidden', 'true');
  pl.innerHTML = '<div class="sp-wall"></div><div class="pl-stage">' + (window.buildWordmark ? buildWordmark({ cls: 'sp-logo pl-logo' }) : '<strong>SPEEDIOO</strong>') + '</div>';
  document.body.appendChild(pl);
  let plT;
  addEventListener('hashchange', () => {
    const h = location.hash.slice(1);
    if (['why', 'checkpoints', 'discover', 'sell28', 'tools', 'city', 'benefits', 'reviews', 'team', 'contact', 'story', 'promise'].includes(h)) return;
    if (document.documentElement.classList.contains('splash-on')) return;
    clearTimeout(plT); pl.classList.add('on');
    plT = setTimeout(() => pl.classList.remove('on'), reduce ? 200 : 480);
  });

  /* re-run enhancements whenever the app renders a page */
  const app = document.getElementById('app');
  if (app) new MutationObserver(() => enhance(app)).observe(app, { childList: true });
  enhance(document);

  /* ---------- scroll-velocity marquee ---------- */
  let lastY = scrollY, vel = 0;
  addEventListener('scroll', () => { vel = scrollY - lastY; lastY = scrollY; }, { passive: true });
  if (!reduce) {
    const loop = () => {
      vel *= .9;
      const m = document.querySelector('.marquee-track');
      if (m) m.style.setProperty('--skew', Math.max(-14, Math.min(14, -vel * .4)).toFixed(2) + 'deg');
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  if (!fine || reduce) return;

  /* ---------- drag-to-scroll rails (desktop) ---------- */
  let drag = null;
  document.addEventListener('pointerdown', e => {
    const rail = e.target.closest && e.target.closest('.rail');
    if (!rail || e.button !== 0) return;
    drag = { rail, x: e.clientX, left: rail.scrollLeft, moved: false };
  });
  document.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 6) { drag.moved = true; drag.rail.classList.add('dragging'); drag.rail.style.scrollSnapType = 'none'; drag.rail.style.scrollBehavior = 'auto'; }
    if (drag.moved) drag.rail.scrollLeft = drag.left - dx;
  });
  document.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.moved) {
      d.rail.addEventListener('click', ev => { ev.stopPropagation(); ev.preventDefault(); }, { capture: true, once: true });
      setTimeout(() => { d.rail.classList.remove('dragging'); d.rail.style.scrollSnapType = ''; d.rail.style.scrollBehavior = ''; }, 50);
    }
  });
})();
