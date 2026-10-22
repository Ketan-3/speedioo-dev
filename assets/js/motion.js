/* Speedioo motion layer (v1.0 premium).
   Motion-style primitives on the Web Animations API, no library download:
   - spring easing (CSS linear() curve, with a cubic fallback)
   - blur-fade reveals with child stagger ([data-stagger])
   - sliding indicator under tabs and segmented controls
   - staggered entry for listing results, rails and modal sheets
   - header "scrolled" state
   Reduced-motion users get instant, static states. */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const SPRING = CSS.supports && CSS.supports('transition-timing-function', 'linear(0, 1)')
    ? 'linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017 19.4%, 1.051 22.3%, 1.064 25.4%, 1.051 30.6%, 1.012 41.8%, 0.996 50.4%, 1.001 72%, 1)'
    : 'cubic-bezier(.2,.9,.25,1.1)';
  const EASE = 'cubic-bezier(.22,1,.36,1)';
  root.style.setProperty('--spring', SPRING);
  root.style.setProperty('--ease-out', EASE);

  const anim = (el, kf, o) => (reduce || !el.animate) ? null : el.animate(kf, Object.assign({ duration: 520, easing: EASE, fill: 'both' }, o));

  /* ---------- stagger index for [data-stagger] children ---------- */
  function indexStagger(scope) {
    (scope || document).querySelectorAll('[data-stagger]').forEach(p => [...p.children].forEach((c, i) => c.style.setProperty('--si', i)));
  }

  /* ---------- sliding indicator under tabs / segmented controls ---------- */
  const TABSEL = '.p-tabs, .seg';
  function placeInd(box) {
    let ind = box.querySelector(':scope > .ind');
    const on = box.querySelector(':scope > .on, :scope > [aria-selected="true"]');
    if (!on) { ind && (ind.style.opacity = 0); return; }
    if (!ind) { ind = document.createElement('i'); ind.className = 'ind'; ind.setAttribute('aria-hidden', 'true'); box.prepend(ind); box.classList.add('has-ind'); }
    const x = on.offsetLeft, w = on.offsetWidth, y = on.offsetTop, h = on.offsetHeight;
    if (!ind._placed || reduce) ind.style.transition = 'none';
    ind.style.transform = `translate(${x}px,${y}px)`; ind.style.width = w + 'px'; ind.style.height = h + 'px'; ind.style.opacity = 1;
    if (!ind._placed) { ind._placed = true; requestAnimationFrame(() => requestAnimationFrame(() => ind.style.transition = '')); }
  }
  function placeAll(scope) { (scope || document).querySelectorAll(TABSEL).forEach(placeInd); }
  document.addEventListener('click', e => {
    const box = e.target.closest && e.target.closest(TABSEL);
    if (box) requestAnimationFrame(() => placeInd(box));
  });
  addEventListener('resize', () => placeAll());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => placeAll());

  /* ---------- staggered entry for lists that re-render ---------- */
  function enterList(nodes, { y = 16, gap = 45, max = 12 } = {}) {
    [...nodes].slice(0, max).forEach((n, i) => anim(n, [{ opacity: 0, transform: `translateY(${y}px)`, filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 560, delay: i * gap }));
  }

  /* ---------- modal / sheet entrance ---------- */
  function enterSheet(layer) {
    const sheet = layer.querySelector('.sheet'), scrim = layer.querySelector('.scrim');
    if (!sheet) return;
    scrim && anim(scrim, [{ opacity: 0 }, { opacity: 1 }], { duration: 240 });
    const mobile = matchMedia('(max-width:900px)').matches && sheet.classList.contains('modal');
    if (mobile) anim(sheet, [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 620, easing: SPRING });
    else if (sheet.classList.contains('modal')) anim(sheet, [{ opacity: 0, transform: 'translate(-50%,-48%) scale(.96)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 480, easing: SPRING });
    else anim(sheet, [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], { duration: 420 });
    enterList(sheet.querySelectorAll('.m-body > *, .drawer-links > *'), { y: 10, gap: 28, max: 10 });
  }

  /* ---------- watch renders ---------- */
  function onRender(scope) { indexStagger(scope); placeAll(scope); }
  const app = document.getElementById('app');
  if (app) new MutationObserver(muts => {
    for (const m of muts) {
      if (m.target === app) { onRender(app); return; }
      const t = m.target;
      if (t.id === 'results' || t.id === 'shopTiles') { enterList(t.querySelectorAll('.card, .tile, .type-card')); placeAll(app); }
      if (t.id === 'heroPane' || t.id === 'qform') enterList(t.children, { y: 8, gap: 35, max: 8 });
    }
  }).observe(app, { childList: true, subtree: true });
  const layer = document.getElementById('layer');
  if (layer) new MutationObserver(() => { if (layer.firstElementChild) { enterSheet(layer); placeAll(layer); } }).observe(layer, { childList: true });
  onRender(document);

  /* ---------- header scrolled state ---------- */
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr && hdr.classList.toggle('scrolled', scrollY > 6);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  window.SpeediooMotion = { anim, enterList, placeAll, SPRING };
})();
