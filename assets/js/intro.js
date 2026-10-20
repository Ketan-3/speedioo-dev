/* Opening animation, ported from the brand's animated logo (speedioo-logo.html, round-tyre version):
   tyres roll in with brake sparks, letters slam in, spark plugs fire, then the site opens.
   Once per browser session; ?intro replays. Click, tap or any key skips. */
(function () {
  const root = document.documentElement;
  if (!window.buildWordmark || !root.classList.contains('splash-on')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { sessionStorage.setItem('spd_intro', '1'); } catch (e) { /* storage blocked */ }

  const el = document.createElement('div');
  el.className = 'splash';
  el.innerHTML = `<div class="sp-wall" aria-hidden="true"></div>
    <div class="sp-stage">${buildWordmark({ cls: 'sp-logo' })}</div>
    <canvas class="sp-fx" aria-hidden="true"></canvas>
    <button class="sp-skip" type="button">Skip</button>`;
  document.body.appendChild(el);

  let finished = false, run = true, idle;
  const done = () => {
    if (finished) return; finished = true; run = false; clearInterval(idle);
    el.classList.add('out'); root.classList.remove('splash-on');
    setTimeout(() => el.remove(), 900);
    if (typeof track === 'function') track('intro_seen');
  };
  el.addEventListener('click', done);
  addEventListener('keydown', done, { once: true });

  const svg = el.querySelector('svg'), wheels = [...el.querySelectorAll('.wheel')], chars = [...el.querySelectorAll('.ch')];
  if (reduce) { setTimeout(done, 900); return; }

  const cv = el.querySelector('.sp-fx'), cx = cv.getContext('2d'), P = [];
  let W, H;
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  const burst = (x, y, n, dir, spread, speed, life) => { for (let i = 0; i < n; i++) { const a = dir + (Math.random() - .5) * spread, s = speed * (.35 + Math.random()); P.push({ x, y, px: x, py: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: life * (.5 + Math.random() * .7), t: 0 }); } };
  let last = performance.now();
  const tick = now => {
    if (!el.isConnected) return;
    const dt = Math.min(.033, (now - last) / 1000); last = now;
    cx.clearRect(0, 0, W, H); cx.globalCompositeOperation = 'lighter';
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]; p.t += dt; if (p.t > p.l) { P.splice(i, 1); continue; }
      p.px = p.x; p.py = p.y; p.vy += 900 * dt; p.vx *= .985; p.x += p.vx * dt; p.y += p.vy * dt;
      const k = 1 - p.t / p.l;
      cx.strokeStyle = `rgba(255,${180 + 75 * k | 0},${90 + 150 * k * k | 0},${k})`; cx.lineWidth = 1 + 1.6 * k; cx.lineCap = 'round';
      cx.beginPath(); cx.moveTo(p.px - (p.x - p.px) * 1.5, p.py - (p.y - p.py) * 1.5); cx.lineTo(p.x, p.y); cx.stroke();
    }
    cx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const rect = e => e.getBoundingClientRect(), sleep = ms => new Promise(r => setTimeout(r, ms));
  const unit = () => svg.getScreenCTM().a;
  function ignite(w, big) {
    const r = rect(w.querySelector('.wpos')), x = r.left + r.width / 2, y = r.top + r.height / 2;
    w.querySelector('.arc').animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: .2 }, { opacity: 1 }, { opacity: 0 }], { duration: 320 });
    w.querySelector('.glow').animate([{ opacity: .9, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(2.6)' }], { duration: 420, easing: 'ease-out' });
    burst(x, y, big ? 46 : 16, -Math.PI / 2, Math.PI * 2, big ? 620 : 380, big ? .9 : .55);
  }
  function rollIn(w, delay) {
    const r = rect(w.querySelector('.wpos')), u = unit(), distPx = r.left + r.width + 80, dist = distPx / u;
    const deg = distPx / (Math.PI * r.width) * 360, ease = 'cubic-bezier(.15,.75,.25,1)';
    w.animate([{ transform: `translateX(${-dist}px)` }, { transform: 'translateX(0)' }], { duration: 1300, delay, easing: ease, fill: 'both' });
    w.querySelector('.spin').animate([{ transform: `rotate(${-deg}deg)` }, { transform: 'rotate(0)' }], { duration: 1300, delay, easing: ease, fill: 'both' });
  }
  (async () => {
    chars.forEach(c => c.style.opacity = 0);
    await sleep(200);
    rollIn(wheels[0], 0); rollIn(wheels[1], 120);
    for (let t = 0; t < 9; t++) { await sleep(t ? 70 : 900); if (!run) return; wheels.forEach(w => { const r = rect(w.querySelector('.wpos')); burst(r.left + r.width * .35, r.bottom - r.height * .04, 5, Math.PI * 1.1, .6, 520, .45); }); }
    wheels.forEach(w => w.querySelector('.spin').animate([{ transform: 'rotate(0)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(0)' }], { duration: 500, easing: 'ease-out' }));
    chars.forEach((c, i) => { c.style.opacity = 1; c.animate([{ opacity: 0, transform: 'translateX(-40px) skewX(-20deg)', filter: 'blur(3px)' }, { opacity: 1, transform: 'translateX(1.5px) skewX(-5deg)', filter: 'blur(0)', offset: .7 }, { opacity: 1, transform: 'translateX(0) skewX(0)' }], { duration: 420, delay: i * 70, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }); });
    await sleep(chars.length * 70 + 350); if (!run) return;
    ignite(wheels[0], true); await sleep(160); ignite(wheels[1], true);
    el.querySelector('.sp-stage').animate([{ filter: 'drop-shadow(0 4px 5px rgba(60,0,0,.55)) brightness(1.6)' }, { filter: 'drop-shadow(0 4px 5px rgba(60,0,0,.55)) brightness(1)' }], { duration: 500 });
    wheels.forEach(w => w.querySelector('.spin').animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 2200, iterations: Infinity, easing: 'linear' }));
    let k = 0; idle = setInterval(() => run && ignite(wheels[k++ % 2], false), 650);
    await sleep(1100); done();
  })();
  setTimeout(done, 7000);
})();
