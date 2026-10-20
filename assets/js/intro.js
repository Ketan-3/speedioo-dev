/* Opening animation: the badge rolls in like a wheel, the wordmark sweeps in letter by letter,
   then the tagline. Shown once per browser session (add ?intro to the URL to replay). Click, tap or any key skips. */
(function () {
  const L = window.SPEEDIOO_LOGO, root = document.documentElement;
  if (!L || !root.classList.contains('splash-on')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { sessionStorage.setItem('spd_intro', '1'); } catch (e) { /* storage blocked */ }
  const el = document.createElement('div');
  el.className = 'splash'; el.setAttribute('aria-label', 'Speedioo');
  el.innerHTML = `<div class="sp-lines" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
   <div class="sp-stage"><svg class="sp-logo" viewBox="0 0 1000 253" role="img" aria-label="Speedioo, Affordable Mobility for All">
    <g class="sp-badge"><path fill="#FFFFFF" d="${L.badgeOuter}"/><path fill="#DE2227" fill-rule="evenodd" d="${L.badgeInner}"/></g>
    ${L.word.map((d, i) => `<path class="sp-l" style="--i:${i}" fill="#FFFFFF" d="${d}"/>`).join('')}
    <path class="sp-tag" fill="#FFFFFF" d="${L.tag}"/>
   </svg><span class="sp-road" aria-hidden="true"></span></div>
   <button class="sp-skip" type="button">Skip</button>`;
  document.body.appendChild(el);
  let finished = false;
  const done = () => {
    if (finished) return; finished = true;
    el.classList.add('out'); root.classList.remove('splash-on');
    setTimeout(() => el.remove(), 750);
    if (typeof track === 'function') track('intro_seen');
  };
  el.addEventListener('click', done);
  addEventListener('keydown', done, { once: true });
  el.addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    el.style.setProperty('--rx', (y * -12).toFixed(2) + 'deg'); el.style.setProperty('--ry', (x * 16).toFixed(2) + 'deg');
  });
  setTimeout(done, reduce ? 800 : 2900);
})();
