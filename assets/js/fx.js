/* Interaction layer: custom cursor with labels, magnetic buttons, hero spotlight, kinetic headings,
   scroll-velocity marquee, 3D tilt cards and a crimson page wipe.
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

  /* ---------- page wipe on route change ---------- */
  const wipe = document.createElement('div'); wipe.className = 'wipe'; wipe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wipe);
  addEventListener('hashchange', () => {
    if (reduce) return;
    const h = location.hash.slice(1);
    if (['why', 'checkpoints', 'tools', 'city', 'benefits', 'reviews', 'team', 'contact', 'story'].includes(h)) return;
    wipe.classList.remove('go'); void wipe.offsetWidth; wipe.classList.add('go');
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

  /* ---------- hero spotlight (cursor, or a slow drift on touch) ---------- */
  let spotT = 0, pointerInHero = false;
  document.addEventListener('pointermove', e => {
    const hero = e.target.closest && e.target.closest('.hero-v5');
    pointerInHero = !!hero;
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
    hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
  }, { passive: true });
  if (!reduce) {
    const drift = () => {
      const hero = document.querySelector('.hero-v5');
      if (hero && (!fine || !pointerInHero)) {
        spotT += .006;
        hero.style.setProperty('--mx', (68 + Math.sin(spotT) * 18).toFixed(2) + '%');
        hero.style.setProperty('--my', (42 + Math.cos(spotT * 1.3) * 14).toFixed(2) + '%');
      }
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  }

  if (!fine || reduce) return;

  /* ---------- custom cursor ---------- */
  root.classList.add('has-cursor');
  const dot = document.createElement('div'), ring = document.createElement('div');
  dot.className = 'cur-dot'; ring.className = 'cur-ring'; ring.innerHTML = '<span></span>';
  dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);
  const label = ring.querySelector('span');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, scale = 1;
  document.addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY; root.classList.remove('cur-hidden');
    const t = e.target;
    if (!t || !t.closest) return;
    const lab = t.closest('[data-cursor]');
    const zone = t.closest('[data-cursor-zone]');
    const clickable = t.closest('a,button,[data-act],label,select,summary,[role=button]');
    const typing = t.closest('input,textarea,select');
    let text = lab ? lab.dataset.cursor : '';
    if (!text && zone && t.closest('.cpx-hot,.cpx-chip')) text = zone.dataset.cursorZone;
    ring.classList.toggle('label', !!text && !typing);
    ring.classList.toggle('hover', !text && !!clickable && !typing);
    label.textContent = text;
    dot.style.opacity = typing ? '0' : '1'; ring.style.opacity = typing ? '0' : '1';
  }, { passive: true });
  document.addEventListener('pointerdown', () => { scale = .82; });
  document.addEventListener('pointerup', () => { scale = 1; });
  document.addEventListener('mouseleave', () => root.classList.add('cur-hidden'));
  const follow = () => {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    ring.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px) scale(${scale})`;
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);

  /* ---------- magnetic buttons ---------- */
  const MAG = '.hero-ctas .btn, .sec-head .btn, .fin, .fab, .final-sec .btn-red';
  let magEl = null;
  document.addEventListener('pointermove', e => {
    const el = e.target.closest && e.target.closest(MAG);
    if (magEl && magEl !== el) { magEl.style.transform = ''; magEl = null; }
    if (!el) return;
    magEl = el; el.classList.add('mag');
    const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(dx * .22).toFixed(1)}px,${(dy * .3).toFixed(1)}px)`;
  }, { passive: true });

  /* ---------- 3D tilt cards ---------- */
  const TILT = '.card, .pillar, .ben, .tool-card:not(.tool-resale), .fin:not(.fin-form), .post, .rev';
  let tiltEl = null;
  document.addEventListener('pointermove', e => {
    const el = e.target.closest && e.target.closest(TILT);
    if (tiltEl && tiltEl !== el) { tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); tiltEl.classList.remove('tilting'); tiltEl = null; }
    if (!el || el.closest('.rail.dragging')) return;
    tiltEl = el; el.classList.add('tilt', 'tilting');
    const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', ((px - .5) * 8).toFixed(2) + 'deg');
    el.style.setProperty('--rx', ((.5 - py) * 8).toFixed(2) + 'deg');
    el.style.setProperty('--px', (px * 100).toFixed(1) + '%'); el.style.setProperty('--py', (py * 100).toFixed(1) + '%');
  }, { passive: true });

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
